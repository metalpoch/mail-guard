# Integración con Coinbase

Para agregar fondos en la cuenta del usuario, está la opción de utilizar Coinbase, más específicamente Coinbase Commerce, una plataforma que permite a negocios aceptar pagos con criptomonedas. Aqui explicamos cómo funciona el ciclo de un pago con Ethereum.

## Ciclo de pago

Desde la pagina `/add-funds` se selecciona el método de Coinbase, y se selecciona un monto a pagar. Después cuando se hace clic en "Confirmar y pagar" se llamará a la ruta de `/api/coinbase/checkout` donde con el `user_id` del usuario loggeado, se creará un `charge` o intento de pago.


```javascript
const charge = await resources.Charge.create({
    name: "Add funds",
    description: "Add funds to your Mail Guard account",
    local_price: {
        amount,
        currency: "USD",
    },
    pricing_type: "fixed_price",
    metadata: {
        user_id,
    },
});
```

![Screenshot_20230815_225246](https://github.com/Jesusml1/mail-guard/assets/40727563/702f823b-a688-4be0-b915-71868c601eb5)

Aqui un ejemplo del `charge` que nos devuelve la API de Coinbase:

```json
{
    "data": {
        "addresses": {
            "ethereum": "0x92e0c6736379e9026c38cda21c2a3e1955e0704a",
            "dai": "0x92e0c6736379e9026c38cda21c2a3e1955e0704a",
            "shibainu": "0x92e0c6736379e9026c38cda21c2a3e1955e0704a",
            "tether": "0x92e0c6736379e9026c38cda21c2a3e1955e0704a",
            "dogecoin": "DJBJfRgwrHAx3vREqs2e5XMYLkPLvDhA7r"
        },
        "brand_color": "#71B7BC",
        "brand_logo_url": "https://res.cloudinary.com/commerce/image/upload/v1691960944/ao6slsomclihclwy95au.png",
        "code": "A73AF38M",
        "coinbase_managed_merchant": false,
        "created_at": "2023-08-15T17:55:58Z",
        "description": "Add funds to your Mail Guard account",
        "exchange_rates": {
            "DAI-USD": "0.99995",
            "ETH-USD": "1838.845",
            "DOGE-USD": "0.073585",
            "SHIB-USD": "0.000010615",
            "USDT-USD": "0.998975"
        },
        "expires_at": "2023-08-15T18:55:58Z",
        "hosted_url": "https://commerce.coinbase.com/charges/A73AF38M",
        "id": "fe6df411-fa6f-4b22-817a-91f82dd4c12f",
        "local_exchange_rates": {
            "DAI-USD": "0.99995",
            "ETH-USD": "1838.845",
            "DOGE-USD": "0.073585",
            "SHIB-USD": "0.000010615",
            "USDT-USD": "0.998975"
        },
        "logo_url": "https://res.cloudinary.com/commerce/image/upload/v1691960944/ao6slsomclihclwy95au.png",
        "name": "Add funds",
        "offchain_eligible": false,
        "organization_name": "Mail Guard",
        "payments": [],
        "pricing": {
            "local": {
                "amount": "1.00",
                "currency": "USD"
            },
            "ethereum": {
                "amount": "0.000544000",
                "currency": "ETH"
            },
            "dai": {
                "amount": "1.000050003000000000",
                "currency": "DAI"
            },
            "shibainu": {
                "amount": "94206.311822892000000000",
                "currency": "SHIB"
            },
            "tether": {
                "amount": "1.001026",
                "currency": "USDT"
            },
            "dogecoin": {
                "amount": "13.58972617",
                "currency": "DOGE"
            }
        },
        "pricing_type": "fixed_price",
        "pwcb_only": false,
        "resource": "charge",
        "support_email": "mailguard.validation@gmail.com",
        "timeline": [
            {
                "status": "NEW",
                "time": "2023-08-15T17:55:58Z"
            }
        ]
    },
    "warnings": [
        "Invalid API version \"c3d1037e-d3af-4cac-827c-c0bac67c9d7e\"; serving latest API version (2018-03-22)"
    ]
}
```

De todos estos datos, tomaremos el `hosted_url`, para redireccionar al usuario a la pantalla de pagos. Tambien tomaremos el `id` del `charge` y crearemos en supabase un registro en la tabla `payments`, eso si el usuario no posee un `charge` con un status de `NEW`, en dado caso, se le sugerira ir a pagar la transacción abierta.

![Screenshot_20230815_225306](https://github.com/Jesusml1/mail-guard/assets/40727563/70e97f55-ef19-438f-9e24-c05add3b2046)

Después de realizado el pago quedará de parte de Coinbase enviar un request de tipo webhook a nosotros para informarnos sobre el estado de la transacción, esto se realiza a través de la ruta de api `/api/coinbase/webhook` la cual se debe agregar al panel de configuración de Coinbase. Esta url se debe agregar en en el menu settings > Notifications > Webhooks subscriptions, agregar el endpoint y guardar el shared secret para usarlo como variable de entorno bajo el nombre de `COINBASE_WEBHOOK_SECRET`. Para hacer pruebas en local, se recomienda usar Ngrok, y asi tener un tunel a localhost.

El request de tipo webhook nos enviara un evento ocurrido a la transacción, de modo que podemos tomar el tipo del evento y cambiar el estatus de nuestro registro en la tabla `payments` en supabase.

Estos son los eventos que estamos escuchando con el webhook:

- `charge:created`: Cuando se crea un intento de pago, simplemente actualizamos el estado del pago a `NEW`.

- `charge:delayed`: Cuando pasan mas de 60 minutos despues de creado el `charge` y este no es pagado.

- `charge:canceled`: Cuando el `charge` es cancelado, esto puede hacerse mediante la API de coinbase usando el `id` del `charge`.

- `charge:pending`: Cuando la se realiza la transacción y se esta a la espera por confirmación.

- `charge:confirmed`: Cuando la transacción es confirmada, en este evento sera donde adjudicaremos el nuevo saldo al balance del usuario. Esto se consigue ya que en el evento que nos envia Coinbase estara guardado en `metadata` el id del usuario, este se guarda cuando se crea el `charge`.

Más información sobre Coinbase en su [documentación](https://docs.cloud.coinbase.com/commerce/docs/crypto-payments).

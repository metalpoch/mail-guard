# API de validación de emails

Esta API te permite verificar si un email es válido, inválido o desechable, usando una base de datos de dominios desechables y una expresión regular.

## Cómo usar la API

- Para usar la API, debes tener una cuenta en [Mail Guard](https://mail-guard.vercel.app/).
- Una vez que tengas tu cuenta, debes iniciar sesión con tu email y contraseña, y obtener un token de autenticación que te identifique como usuario, Este token lo obtendras haciendo click en el icono azul. <img src="https://raw.githubusercontent.com/metalpoch/mail-guard/528b34c1652c70cdba18b5cd877675036663aa18/public/assets/apiKey.jpeg">
- Luego, debes enviar una petición GET a la ruta `/api/check`, con el parámetro `email` que contenga el email que quieres validar, y el encabezado `authentication` que contenga el valor `Bearer <token>`, donde `<token>` es el token que obtuviste al iniciar sesión.
- La API te devolverá un objeto JSON con tres propiedades: `valid`, `code_message` y `message`.
- Si no envías el parámetro `email` o el encabezado `authentication`, o si envías un token inválido o caducado, la API te devolverá un objeto JSON con una propiedad llamada `error`, que tendrá un mensaje de error que explicará la causa del problema.

## Ejemplo de uso

Supongamos que quieres validar el email `johndoe@example.com`, y que tu token de autenticación es `Bearer 1234567890abcdef`. Entonces, debes enviar una petición GET a la siguiente URL:

```

/api/check?email=fooziman@example.com

```

Y debes incluir el siguiente encabezado:

```

authentication: Bearer 1234567890abcdef

```

La API te devolverá el siguiente objeto JSON:

```json
{
  "valid": true,
  "code_message": "VALID_EMAIL",
  "message": "Email is valid"
}
```

Esto significa que el email es válido y no es desechable.

Si quieres validar el email `fooziman@tempmail.com`, y usas el mismo token de autenticación, debes enviar una petición GET a la siguiente URL:

```
/api/check?email=fooziman@tempmail.com
```

Y debes incluir el mismo encabezado:

```
authentication: Bearer 1234567890abcdef
```

La API te devolverá el siguiente objeto JSON:

```json
{
  "valid": false,
  "code_message": "BLACKLISTED_EMAIL_DOMAIN",
  "message": "Email domain is in the blacklist"
}
```

Esto significa que el email no es válido .

Si olvidas enviar el parámetro `email` o el encabezado `authentication`, o si envías un token incorrecto o vencido, la API te devolverá un objeto JSON con la propiedad `error`, por ejemplo:

```json
{
  "error": "The query email is required"
}
```

O bien:

```json
{
  "error": "User invalid or non-existent Api Key"
}
```

# Mail Guard

![Intro](https://readme-typing-svg.demolab.com?font=Fira+Code&color=1A54F7&size=14&duration=2000&multiline=true&repeat=false&width=435&lines=Protegemos+y+optimizamos;+la+integridad+de+tus+contactos.)

El mejor servicio para verificar la calidad y la seguridad de tus emails. Mail Guard es un servicio que te permite verificar si un email es de dudosa procedencia o un email temporal. Con una simple llamada a nuestra API, podrás saber si el email que quieres usar o contactar es válido, seguro y confiable.

## 📫¿Por qué usar Mail Guard?

Mail Guard te ofrece las siguientes ventajas:

- Evita el spam y el phishing al detectar emails falsos o maliciosos.
- Aumenta la calidad de tu base de datos al eliminar emails inválidos o inexistentes.
- Mejora la entrega y la tasa de apertura de tus campañas de email marketing al asegurarte de que tus destinatarios son reales y activos.
- Ahorra tiempo y recursos al no tener que validar manualmente cada email que recibes o envías.

## ¿Quieres conocer nuestros planes?

Nuestros planes van desde las 20 peticiones ¡hasta 10K por mes! ¿no es increíble?

|     | Plan    | Peticiones | Dirigido a                           | Soporte |
| --- | ------- | ---------: | ------------------------------------ | :-----: |
| 🥉  | Gratis  |         20 | Aplicaciones de prueba               |   🔴    |
| 🥈  | Premium |       1000 | Aplicaciones en producción           |   🟢    |
| 🥇  | Top     |     10.000 | Empresas con alto volumenes de datos |   🟢    |

## 🛰️ Nuestro servicio utiliza las siguientes Tecnologías

- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/240px-Typescript_logo_2020.svg.png" width=30 /> [TypeScript]: es un lenguaje de programación que extiende JavaScript
- <img src="https://www.svgrepo.com/show/354113/nextjs-icon.svg" width=30 /> [Next.js]: es un framework de React para construir aplicaciones web modernas y escalables
- <img src="https://cf.appdrag.com/dashboard-openvm-clo-b2d42c/uploads/supabase-TAiY.png" width=30 /> [Supabase]: Plataforma de backend-as-a-service (BaaS) para construir aplicaciones

## 💾 Instalación y uso de manera local

### Clona este repositorio [GitHub]

```bash
git clone https://github.com/metalpoch/mail-guard.git
```

### Instale las dependencias

¡La instalación de las dependencias es mas fácil que nunca! Solo ejecute uno de los siguientes script basado en su sistema operativo.

```bash
cd mail-guard
npm install
```

Estos script instalaran las dependencias del frontend y del backend en flask, usando los entornos virtuales e instalando las dependencias en dichos entornos.

## 🗝️ Variables De Entorno

```bash
APP_URL=""
NEXT_PUBLIC_SUPABASE_URL=""
NEXT_PUBLIC_SUPABASE_ANON_KEY=""

TRELLO_API_KEY=
TRELLO_TOKEN=
TRELLO_BOARD_LIST_ID=

UPTIME_ROBOT_KEY=
NEXT_UPTIME_ROBOT_STATUS_PAGE_URL=
```

## ⚡Ejecución local

Esta es la parte mas difícil y complicada debido a la gran cantidad de comandos que hay que utilizar

```bash
npm run dev # ¡Listo!
```

## Estructura del proyecto 🏗️

```
├── README.md           # esta humilde documentación que estas leyendo 😜
├── public/assets       # directorio de archivos estaticos
|── .env                # variables de entorno
└── src/                # directorio base de la aplicación
│   ├── app/              # directorio principal de la app
│   ├── components/       # directorio de componentes
│   ├── hook/             # custom hooks
│   ├── lib/              # tipos e interfaces de ts
│   ├── mocks/            # datos de prueba
```

[github]: https://github.com/metalpoch/mail-guard/
[next.js]: https://nextjs.org/
[supabase]: https://supabase.com/
[typescript]: https://www.typescriptlang.org/

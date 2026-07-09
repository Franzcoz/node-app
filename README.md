# Cool Wallet App v1.0.0 — Node Express Basic Finances WebApp

Aplicación web básica para adminsitración de activos financieros construida con **Node.js** y **Express**. El proyecto está creado como una base para el desarrollo de un sistema de cartera de inversiones, y consta de:

- Frontend Web (HTML, CSS, JS)
- API REST de ejemplo
- Backend con Node.js, Express y securización mediante JWT
- Sistema de logging a archivo
- Estructura preparada para crecimiento modular

Pruébala [aquí](https://coll-wallet.onrender.com) con las credenciales usuario: GUEST y contraseña: guest4231

- - -
## Objetivo del proyecto

Servir como base simple y ordenada para futuras funcionalidades:

- Ingreso de compras
- Ingreso de ventas
- Consulta de cartera
- Integración con base de datos SQL
- Autenticación de usuarios

- - -
## Tecnologías usadas

- Node.js
- Express
- CORS
- dotenv
- PG + sequelize
- JWT
- Nodemon (desarrollo)

- - -
## Instalación

Node.js es prerequisito y necesita estar instalado en el sistema. Luego descargue la carpeta de proyecto o clone el repositorio.

- - -
## Estructura del Proyecto

proyecto/  
│  
├── app.js  
├── .env(.example)  
├── package.json  
├── README.md  
│  
├── logs/  
│ └──log.txt  
│  
├── assets/ # Assets públicos  
│ ├── css/  
│ └── img/  
│  
├── private/ # Frontend privado  
│ ├── menu.html  
│ ├── ...  
│ └── js/  
│  
├── public/ # Frontend público  
│ ├── main.html  
│ ├── ...  
│ ├── css/  
│ ├── img/  
│ └── js/  
│  
└── src/  
  ├── config/  
  │ ├── database.js  
  │ └── sequelize.js  
  ├── controllers/  
  ├── middlewares/  
  ├── models/  
  ├── routes/  
  ├── sql/  
  │ └── create-tables-sistema.sql  
  └── services/  



### Configuración

Cambie el nombre del archivo .env.example a .env y agregue las variables de entorno necesarias para el uso de JWT y la configuración de la base de datos.

Luego en el directorio principal instale las dependencias ejecutando:

`npm install`

- - -
## Ejecución del Proyecto

Para ejecutar el proyecto se definieron los siguientes scripts:

- `npm run start` --> Ejecutar
- `npm run dev` --> Ejecutar en modo desarrollo

Para ejecutar la aplicación se debe usar el primer script. El segundo script está reservado para entornos de desarrollo.

- - -
## Ejemplos de uso

La aplicación se ejecutará en el puerto configurado, que por defecto es'https://localhost:3000/'. Puede también probar la API accediendo a la ruta '/api/status'.

- - -
## To-Do

- [x] Utilizar sequelize para consultas a BD
- [x] Incorporar autenticación con token por medio de cookies
- [x] Implementar rutas privadas con redireccionamiento desde servidor
- [ ] Implementar rutas y/o consultas protegidas según rol de usuario desde servidor
- [ ] Incorporar usuario en log desde authMiddle u otro
- [ ] Implementar pantallas y backend para administración de Usuarios
- [ ] Implementar pantallas y backend para administración de Roles
- [ ] Implementar pantallas y backend para administración de Menús
- [ ] Implementar pantallas y backend para administración de Nemotécnicos
- [ ] Implementar pantallas y backend para consulta y valorización de Carteras
- [ ] Implementar pantallas y backend para ingreso de Ventas
- [ ] Implementar setup para configurar BD local o serverless
- [ ] Implementar creación de BD local desde cero

- - -
## Convenciones

La aplicación se ejecuta mediante un archivo principal llamado app.js. Se decidió ese nombre para evitar confusiones con el archivo index.html e index.js del frontend y porque representa mejor la naturaleza del programa, pero luego se decidió cambiar también el nombre de aquellos por main.html y main.js pues index.html no estaba siendo registrado como la ruta raíz '/' adecuadamente, lo que interfería con los logs.
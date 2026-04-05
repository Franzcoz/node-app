# App v1.0.0 — Node Express WebApp

Aplicación web base construida con **Node y Express**.

- - -
## Convenciones

La aplicación se ejecuta mediante un archivo principal llamado app.js. Se
decidió ese nombre para evitar confusiones con el archivo index.html e index.js del frontend y porque representa mejor la naturaleza del programa, pero luego se decidió cambiar también el nombre de aquellos por main.html e main.js pues index.html no estaba siendo registrado como la ruta raíz '/' adecuadamente, lo que interfería con los logs.


- - -
## Instalación

Node.js es prerequisito y necesita estar instalado en el sistema.

Luego descargue la carpeta de proyecto o clone el repositorio, y en el directorio principal instale las dependencias ejecutando:

```npm install```

- - -
## Ejecución del Proyecto

Para ejecutar el proyecto se definieron los siguientes scripts:

- `npm run start` \--> Ejecutar en modo producción
- `npm run dev` \--> Ejecutar en modo desarrollo

Si desea utilizar la aplicación ejecute el primero, y si desea modificarla es recomendable usar el segundo script.

- - -
## Ejemplos de uso

Por ahora la aplicación está en una etapa temprana de desarrollo en preparación para añadir funcionalidades en el futuro, pero puedes probar accediendo desde un navegador a las rutas principales 'https://localhost:3000/', 'https://localhost:3000/api/status' y 'https://localhost:3000/login'
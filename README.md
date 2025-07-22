
## Description

backend hecho con prisma y sqlite3
## Primero asegurese de cambiar el nombre del proyecto a "back" para que funcione correctamente desde el inicio
## Project setup

npm install

## Inicializar prisma para la base de datos

npx prisma generate

## generar base de datos

npx prisma migrate dev --name init

## Inicia servidor

npm run start dev

## aqui la documentacion de los servicios

http://localhost:4000/api/#/

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

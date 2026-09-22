# API de Tickets de Soporte

API REST construida con NestJS, PostgreSQL y autenticación JWT para gestionar tickets de soporte técnico. Evolución del sistema de tickets original (hecho en Python con una cola de prioridad en memoria) hacia una API real con persistencia, autenticación y tests.

## Tecnologías

- NestJS + TypeScript
- PostgreSQL + TypeORM
- JWT (autenticación) + bcrypt (hash de contraseñas)
- Jest (tests unitarios)
- Docker + Docker Compose

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/sdiego-s/api-tickets.git
cd api-tickets
```

2. Crea un archivo `.env` basado en `.env.example` con tus propios valores.

3. Levanta todo el proyecto (API + base de datos) con Docker:

```bash
docker compose up -d --build
```

La API queda disponible en `http://localhost:3000`.

## Uso

### Registro
```
POST /users
{ "username": "diego", "password": "clave1234" }
```

### Login
```
POST /auth/login
{ "username": "diego", "password": "clave1234" }
```
Devuelve un `access_token` (JWT) que se manda en el header `Authorization: Bearer <token>` para los endpoints protegidos.

### Crear ticket (requiere autenticación)
```
POST /tickets
{ "descripcion": "Servidor caído", "prioridad": "alta", "canal": "telefono" }
```

### Ver cola (público)
```
GET /tickets
```

### Atender siguiente ticket (requiere autenticación)
```
POST /tickets/atender
```

### Decisiones técnicas

Decidí migrar mi proyecto de Python, que solo vivía en memoria y no tenía persistencia real ni un uso práctico, a esta API. Aquí los tickets se guardan en una base de datos real, así que aunque se reinicie el servidor, los datos y el historial de tickets no se pierden.

En el campo `atendido: boolean` decidí manejarlo así para no desechar los tickets al atenderlos, y así conservar el historial completo en la base de datos.

Otro aspecto a recalcar es por qué `verCola` es público pero `crear` y `atender` requieren JWT. Esto es porque `verCola` no solo ayuda al agente que atiende tickets, sino también a los clientes, ya que pueden ver en qué lugar de la fila están. En cambio, `crear` y `atender` son acciones que solo debe poder hacer un usuario autenticado.

En cuanto a seguridad, validé varias cosas con pruebas reales: que la firma del JWT se verifique correctamente (un token con un solo carácter alterado es rechazado), que la expiración funcione tal como se configura (probé con un token de 2 segundos y confirmé que deja de funcionar pasado ese tiempo), y que el `ValidationPipe` con `whitelist: true` elimine campos que no deberían mandarse (como intentar mandar `atendido: true` al crear un ticket).

## Nota sobre el desarrollo

Construí este proyecto con ayuda de Claude como tutor: me explicó conceptos nuevos para mí (TypeORM, JWT, testing con Jest), señaló mis errores y me guio en la estructura a seguir. Todo el código lo escribí, depuré y probé yo mismo, línea por línea.
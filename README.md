# AjudAE API<p align="center">

<a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>

API REST desenvolvida com NestJS para gerenciamento de posts, professores e alunos com sistema de autenticação JWT.</p>

## Funcionalidades[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

[circleci-url]: https://circleci.com/gh/nestjs/nest

- ✅ Autenticação JWT (login/registro)

- ✅ CRUD de usuários (professores e alunos) <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

- ✅ CRUD de posts com validação de permissões <p align="center">

- ✅ Validação de roles (professores podem CRUD posts, alunos apenas READ)<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>

<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Tecnologias<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>

<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>

- NestJS<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>

- TypeORM<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>

- MySQL<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>

- JWT <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>

- bcryptjs <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>

- class-validator <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>

</p>

## Configuração <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

[![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

1. Clone o repositório

2. Instale as dependências:## Description

```bash

npm install[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

```

## Project setup

3. Configure o banco de dados no arquivo `.env` (copie de `.env.example`):

`bash`bash

cp .env.example .env$ npm install

````



4. Configure seu banco MySQL e atualize as variáveis no `.env`## Compile and run the project



5. Execute a aplicação:```bash

```bash# development

npm run start:dev$ npm run start

```

# watch mode

## Endpoints$ npm run start:dev



### Autenticação# production mode

$ npm run start:prod

- `POST /auth/register` - Registrar novo usuário```

- `POST /auth/login` - Login de usuário

## Run tests

### Usuários

```bash

- `GET /users` - Listar todos os usuários (autenticado)# unit tests

- `GET /users/professores` - Listar todos os professores (autenticado)$ npm run test

- `GET /users/alunos` - Listar todos os alunos (autenticado)

- `GET /users/:id` - Buscar usuário por ID (autenticado)# e2e tests

- `POST /users` - Criar novo usuário (autenticado)$ npm run test:e2e

- `PATCH /users/:id` - Atualizar usuário (autenticado)

- `DELETE /users/:id` - Remover usuário (autenticado)# test coverage

$ npm run test:cov

### Posts```



- `GET /posts` - Listar todos os posts (autenticado)## Deployment

- `GET /posts/:id` - Buscar post por ID (autenticado)

- `POST /posts` - Criar novo post (apenas professores)When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

- `PATCH /posts/:id` - Atualizar post (apenas o professor autor)

- `DELETE /posts/:id` - Remover post (apenas o professor autor)If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:



## Autenticação

### JWT Authentication
Para endpoints que exigem autenticação JWT, inclua o token no header:
```
Authorization: Bearer SEU_JWT_TOKEN
```

### API Key Authentication
Para endpoints `/api/*`, use API Key no header:
```
X-API-Key: ak_test_12345_permanent_key_for_frontend_testing
```

A API Key está configurada no arquivo `.env`:
```
API_KEY=ak_test_12345_permanent_key_for_frontend_testing
```

## Exemplos de Uso```bash

$ npm install -g @nestjs/mau

### Registro de usuário$ mau deploy

```json```

POST /auth/register

{With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

  "email": "professor@exemplo.com",

  "password": "senha123",## Resources

  "name": "Professor Teste",

  "role": "professor"Check out a few resources that may come in handy when working with NestJS:

}

```- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).

### Login- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).

```json- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.

POST /auth/login- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).

{- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).

  "email": "professor@exemplo.com",- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).

  "password": "senha123"- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

}

```## Support



### Criação de post (com Bearer token)Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

```json

POST /posts## Stay in touch

Authorization: Bearer SEU_JWT_TOKEN

{- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)

  "title": "Título do Post",- Website - [https://nestjs.com](https://nestjs.com/)

  "content": "Conteúdo do post aqui..."- Twitter - [@nestframework](https://twitter.com/nestframework)

}

```## License



## Roles e PermissõesNest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).


- **Professor**: Pode criar, editar, deletar e visualizar posts (apenas os próprios)
- **Aluno**: Pode apenas visualizar posts

## Estrutura do Projeto

```
src/
├── auth/                 # Módulo de autenticação
├── users/                # Módulo de usuários
├── posts/                # Módulo de posts
├── entities/             # Entidades TypeORM
├── dto/                  # Data Transfer Objects
├── guards/               # Guards de autenticação/autorização
├── decorators/           # Decorators customizados
├── app.module.ts         # Módulo principal
└── main.ts              # Entry point
```
````
# ajudae-api

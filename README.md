# AjudAE API

API REST construída com NestJS para gerenciar posts, professores e alunos, com autenticação via JWT e opção de API Key.

## Funcionalidades

- Autenticação JWT (login e registro)
- CRUD de usuários (professores e alunos)
- CRUD de posts com regras de permissão
- Filtro e paginação de posts (`search`, `page`, `pageSize`)

## Stack

- NestJS
- TypeORM
- MySQL
- Docker / Docker Compose
- JWT (com `@nestjs/jwt`)

## Como rodar

### Dev (hot-reload)

```bash
docker compose -f docker-compose.dev.yml up -d --build

# opcional: ver logs
docker logs -f ajudae_api_dev
```

### Prod (build + dist)

```bash
docker compose up -d --build

# opcional: ver logs
docker logs -f ajudae_api
```

### Seed do banco

Após subir os serviços, rode o seed para criar usuários e posts de exemplo.

Dev:

```bash
docker exec -it ajudae_api_dev npm run seed
```

Prod:

```bash
docker exec -it ajudae_api npm run seed
```

Credenciais criadas pelo seed:

- Professor: `prof.silva@escola.com` / `123456`
- Professor: `prof.maria@escola.com` / `123456`
- Professor: `prof.carlos@escola.com` / `123456`
- Aluno: `ana.costa@aluno.com` / `123456` (entre outros)

## Autenticação

Você pode usar JWT ou uma API Key fixa para testes.

### JWT

Header:

```
Authorization: Bearer <TOKEN>
```

Obtenha o token com `POST /auth/login`.

### API Key (para endpoints `/api/*`)

Header:

```
x-api-key: ak_test_12345_permanent_key_for_frontend_testing
```

## Endpoints

A documentação completa está em `ENDPOINTS.md`.

Principais exemplos:

```bash
# Health
curl http://localhost:3000/

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"prof.silva@escola.com","password":"123456"}'

# Listar posts (JWT)
curl -H "Authorization: Bearer <TOKEN>" \
  http://localhost:3000/posts

# Filtro de posts por título (case-insensitive)
curl -H "Authorization: Bearer <TOKEN>" \
  "http://localhost:3000/posts?search=prog&page=1&pageSize=10"
```

Observação: atualmente o endpoint retorna um objeto com paginação:

```json
{
  "data": [{ "id": 1, "title": "..." }],
  "total": 8,
  "page": 1,
  "pageSize": 10
}
```

## Estrutura do projeto

```
src/
├── auth/
├── users/
├── posts/
├── entities/
├── dto/
├── guards/
├── decorators/
├── app.module.ts
└── main.ts
```

## Scripts úteis

```bash
# rodar em dev local (fora do Docker)
npm install
npm run start:dev

# rodar testes
npm run test
npm run test:e2e

# lint/format
npm run lint
npm run format
```

---

Se algo não funcionar como esperado, verifique se o container correto está rodando (dev: `ajudae_api_dev`, prod: `ajudae_api`) e se o seed foi executado.

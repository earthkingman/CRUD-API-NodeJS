# CRUD-API-NodeJS

### 1. 프로젝트 구조
- 기본 환경
  - IDE : VsCode 
  - OS : MAC
  - Git
- 웹 서버 어플리케이션 개발 환경
  - NodeJS
  - Express
  - TypeScript
  - TypeORM
- 데이터베이스
  - SQLite 
### 2. 디렉토리 구조

```bash

├── src
│   ├── app
│         ├── controller
│         ├── definition
│         ├── entity
│         ├── jwt-util
│         ├── middlewares
│         ├── routes
│         ├── passport
|         ├── seed
|         ├── exception
|         ├── swagger
│         ├── index.ts
│         └── app.ts
│
│── ormconfig.ts
│── package.json
│── package-lock.json
└── tsconfig.json 
``` 

### 3. API
[API 명세서](https://app.swaggerhub.com/apis-docs/earthkingman/PreOnboardingCourse_CRUD_API/1.0.0#/)

[SeedData](https://github.com/earthkingman/CRUD-API-NodeJS/wiki/SeedData)
### 3. 빌드 및 실행 방법
- 명령어
   ```shell
   npm i
   npm run api-docs
   npm start
   ```
- 접속

   localhost:3000/api-docs 

### 4.개발 보고서
[보고서](https://github.com/earthkingman/CRUD-API-NodeJS/wiki)

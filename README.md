# CRUD-API-NodeJS
### 1. 설명
 게시판 REST API
 - 글 작성, 글 확인, 글 목록 확인, 글 수정, 글 삭제 API
 - pagination API
 - API 보안
 - in-memory database

### 2. 프로젝트 구조
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
### 3. 디렉토리 구조

```bash

├── src
│   ├── app
│         ├── controller   (컨트롤러)
│         ├── definition   (사용자 정의 타입 폴더)
│         ├── entity       (DB 모델)
│         ├── jwt-util     (인증 로직)
│         ├── middlewares  (인증 및 에러 미들웨어)
│         ├── routes       (라우터)
│         ├── passport     (login 모듈)
│         ├── seed         (seedData)
│         ├── exception    (에러 클래스)
│         ├── swagger      (API 문서)
│         ├── index.ts 
│         └── app.ts
│
├── ormconfig.ts
├── package.json 
└── tsconfig.json 

``` 
    
### 4. API 명세
[API 명세서](https://app.swaggerhub.com/apis-docs/earthkingman/PreOnboardingCourse_CRUD_API/1.0.0#/)

[SeedData](https://github.com/earthkingman/CRUD-API-NodeJS/wiki/SeedData)
### 5. 빌드 및 실행 방법
- 파일명 변경 .env.sample ->  .env 
```
  mv .env.sample .env
  ```
- 명령어  (설치가 조금 오래 걸립니다. 조금만 기다려 주세요)
   ```shell
   npm i
   npm run api-docs
   npm start
   ```
- 접속

   http://localhost:3000/api-docs 

### 6.개발 보고서

 [보고서](https://github.com/earthkingman/CRUD-API-NodeJS/wiki)

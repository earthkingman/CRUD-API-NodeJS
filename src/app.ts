import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import express from "express";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
};

app.listen(5000, async () => {
  console.log("서버 가동");
  createConnection().then(async () => {
    console.log("DB 연결");
  });
});

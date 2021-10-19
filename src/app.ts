import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import express from "express";
import {User} from "./entity/user";
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
  createConnection().then(async (connection) => {
        console.log("Inserting a new user into the database...");
    const user = new User();
    console.log(user);
    console.log("----------------");
    user.email = "Timber";
    user.password = "Saw";
    await connection.manager.save(user);
    console.log("Saved a new user with id: " + user.id);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

    console.log("DB 연결");
  });
});

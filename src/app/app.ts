import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import express, { Express } from "express";
import bodyParser from 'body-parser';
import { applicationRouter } from './routes/applicationRouter';
import passport from "passport";
import passportConfig from "./passport";
passportConfig();
dotenv.config();

export class Application {
  private _server: Express;

  constructor() {
    this._server = express();
    this._server.set('host', process.env.HOST || 'localhost');
    this._server.set('port', process.env.PORT || 3000);
    this._server.use(passport.initialize());
    this._server.use(bodyParser.json());
    this._server.use(bodyParser.urlencoded({ extended: true }));
    this._server.use(applicationRouter);

  }

  public startServer(): void {
    const host: string = this._server.get('host');
    const port: number = this._server.get('port');
    this._server.listen(port, host, () => {
      createConnection().then(async (connection) => {

      });
      console.log(`Server started at http://${host}:${port}`);
    });
  }
}



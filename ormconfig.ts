import dotenv from "dotenv";
dotenv.config();

export = {
  type: "sqlite",
  database: "database.sqlite",
  // database: ":memory:",
  synchronize: true,
  logging: true,
  entities: ["src/app/entity/**/*.ts"],
  migrations: ["src/app/migration/**/*.ts"],
  subscribers: ["src/app/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/app/entity",
    migrationsDir: "src/app/migration",
    subscribersDir: "src/app/subscriber",
  },
};

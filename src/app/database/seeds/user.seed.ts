import { Factory, Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import { User } from "../../entity/user";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const encryptedPassword = await bcrypt.hashSync("1234", +process.env.SALT_ROUNDS);
    const userData = [
      {
        email: "test@email.com",
        password: encryptedPassword,
        token: "0",
      },
    ];
    await connection.getRepository(User).save(userData);
  }
}
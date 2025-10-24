import "reflect-metadata";
import { DataSource } from "typeorm";
import { IDBConnection } from "../database/interfaces/database.interface";
import envs from "./envs.config";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE! as any,
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
  synchronize: false,
  logging: false,
  entities: ["src/modules/**/*.model.ts"],
});

export class PostgreConfig implements IDBConnection {
  public async connect(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log("Data Source connection initialized");
    } catch (error) {
      console.error("Error during Data Source initialization", error);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await AppDataSource.destroy();
      console.log("Data Source connection finnished");
    } catch (error) {
      console.error("Error during Data Source termination", error);
    }
  }
}

import { createConnection } from "typeorm";
import { Cat } from "./entities/Cat";

export default {
  type: "postgres",
  database: "tut14",
  username: "postgres",
  password: "123",
  entities: [Cat],
  synchronize: true,
  logging: false,
} as Parameters<typeof createConnection>[0];

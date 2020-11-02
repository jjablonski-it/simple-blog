import { ConnectionOptions } from "typeorm";
import Post from "../entities/Post";
import User from "../entities/User";

export default {
  type: "postgres",
  database: "tut14",
  username: "postgres",
  password: "123",
  entities: [Post, User],
  synchronize: true,
  logging: true,
} as ConnectionOptions;
// Parameters<typeof createConnection>[0];

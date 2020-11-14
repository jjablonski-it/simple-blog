import { ConnectionOptions } from "typeorm";
import Post from "../entities/Post";
import User from "../entities/User";
import Updoot from "../entities/Upvote";

export default {
  type: "postgres",
  database: "tut14",
  username: "postgres",
  password: "123",
  entities: [Post, User, Updoot],
  synchronize: true,
  logging: true,
} as ConnectionOptions;
// Parameters<typeof createConnection>[0];

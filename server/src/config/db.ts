import { ConnectionOptions } from "typeorm";
import Post from "../entities/Post";
import User from "../entities/User";
import Upvote from "../entities/Upvote";
import dotenv from "dotenv";

// Load enviromental variables
dotenv.config();

// Env variables
const { DATABASE, USERNAME, PASSWORD } = process.env;

export default {
  type: "postgres",
  database: DATABASE,
  username: USERNAME,
  password: PASSWORD,
  entities: [Post, User, Upvote],
  synchronize: true, // For simplicity
  logging: true,
} as ConnectionOptions;
// Parameters<typeof createConnection>[0];

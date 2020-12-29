import { ConnectionOptions } from "typeorm";
import Post from "../entities/Post";
import User from "../entities/User";
import Upvote from "../entities/Upvote";
import dotenv from "dotenv";

// Load enviromental variables
dotenv.config();

// Env variables
const {
  DATABASE,
  DATABASE_URL,
  HOST,
  USERNAME,
  PASSWORD,
  NODE_ENV,
} = process.env;

const _prod = NODE_ENV === "production";
console.log(_prod);

export default {
  type: "postgres",
  host: HOST,
  url: DATABASE_URL,
  database: DATABASE,
  username: USERNAME,
  password: PASSWORD,
  port: 5432,
  entities: [Post, User, Upvote],
  synchronize: true,
  logging: true,
  ssl: _prod ? { rejectUnauthorized: false } : false,
} as ConnectionOptions;

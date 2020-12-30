import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import session from "express-session";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import dbConfig from "./config/db";
// Config
import dotenv from "dotenv";
import PostResolver from "./resolvers/PostResolver";
import UserResolver from "./resolvers/UserResolver";
import createUserLoader from "./utils/createUserLoader";
import createVoteStatusLoader from "./utils/createVoteStatusLoader";

dotenv.config();
const { PORT, SESSION_SECRET, NODE_ENV, CLIENT_URL } = process.env;

const _prod = NODE_ENV === "production";
console.log(PORT, SESSION_SECRET, NODE_ENV, CLIENT_URL);

(async () => {
  // const MongoStore = connectMongo(session);

  await createConnection(dbConfig).catch((e) => console.log(e));
  const app = express();
  app.set("trust proxy", 1);

  // Express middleware
  app.use(
    cors({
      origin: CLIENT_URL,
      credentials: true,
    })
  );

  app.use(
    session({
      name: "qid",
      secret: "secret", //TODO
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: _prod ? "none" : "lax",
        secure: _prod,
        domain: "posts-with-auth.herokuapp.com",
      },
      // store: new MongoStore({ url: "mongodb://localhost/tut14_store" }),
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      userLoader: createUserLoader(),
      voteStatusLoader: createVoteStatusLoader(),
    }),
    playground: true,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // Test route
  app.get("/", async (_req, res) => {
    res.send("OK 👌");
  });

  app.listen(PORT, () =>
    console.log(
      `Server running on http://localhost:${PORT} \ngraphql endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
})();

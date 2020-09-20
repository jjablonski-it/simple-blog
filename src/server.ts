import express from "express";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import session from "express-session";
import dbConfig from "./config/db";
import PostResolver from "./resolvers/PostResolver";
import cors from "cors";

// Config
import { PORT } from "./config/main";
import UserResolver from "./resolvers/UserResolver";

import "reflect-metadata";

(async () => {
  await createConnection(dbConfig);
  const app = express();

  // Express middleware
  app.use(cors({ origin: "http://localhost:3000", credentials: true }));

  app.use(
    session({
      name: "qid",
      secret: "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true,
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req }) => ({ req }),
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

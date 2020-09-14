import express from "express";
import { config } from "dotenv";
import { createConnection } from "typeorm";
import { Cat } from "./entities/Cat";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import dbConfig from "./dbConfig";
import TestResolver from "./resolvers/testResolver";
config();

// Config
const { PORT } = process.env;

(async () => {
  await createConnection(dbConfig);
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [TestResolver] }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  // Test route
  app.get("/", async (_req, res) => {
    await Cat.insert({ name: "Test cat" });
    res.send("OK 👌");
  });

  app.listen(PORT, () =>
    console.log(
      `Server running on http://localhost:${PORT} \ngraphql endpoint: http://localhost:${PORT}${apolloServer.graphqlPath}`
    )
  );
})();

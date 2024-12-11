import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express, { RequestHandler } from "express";

async function init() {
  const app = express();

  const PORT = Number(process.env.PORT) || 3000;

  // create gqlServer

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String
        }
    `,
    resolvers: {
      Query: {
        hello: () => `hello  graph`,
      },
    },
  });

  // start gql Server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ messaage: " get req" });
  });

  app.use(cors()); // Enable CORS if required
  app.use(express.json()); // Parse JSON requests

  console.log(typeof expressMiddleware);

  app.use("/graphql", expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Initialize the server
init().catch((error) => {
  console.error("Server initialization failed:", error);
});

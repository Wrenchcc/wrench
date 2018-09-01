import { ApolloServer } from "apollo-server";
import resolvers from "./graphql/resolvers";
import schema from "./graphql/schema";
import db from "./db";
import services from "./services";
import { getUserFromRequest } from "./utils";

const { PORT = 4000 } = process.env;

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: getUserFromRequest(req),
    services,
    db
  })
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

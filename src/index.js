const { GraphQLServer } = require("graphql-yoga");
const mongoose = require("mongoose");
require("dotenv").config();
const Mutation = require("./resolvers/Mutation");
const Query = require("./resolvers/Query");

mongoose.connect("mongodb://localhost:27017/joxibooks", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const resolvers = {
  Query,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: "src/schema/graphql/schema.graphql",
  resolvers,
});

server.start({ port: process.env.PORT }, () =>
  console.log(`The server is running on http://localhost:${process.env.PORT}`)
);

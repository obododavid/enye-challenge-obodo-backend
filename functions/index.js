const { https } = require('firebase-functions');
const gqlServer = require('./graphql/server');

// const { ApolloServer } = require('apollo-server-express');
// const bodyParser = require('body-parser');
// const schema = require('./graphql/schema');
// const resolvers = require('./graphql/resolvers');
// const express = require('express');
// const app = express();
// app.use(bodyParser.json());
// const apolloServer = new ApolloServer({
//     typeDefs: schema,
//     resolvers,
//     // Enable graphiql gui
//     introspection: true,
//     playground: true
// });
// apolloServer.applyMiddleware({ app, path: '/', cors: true });
// console.log('running on port 4000')


const server = gqlServer();
// server.listen(4000)
exports.api = https.onRequest(server);


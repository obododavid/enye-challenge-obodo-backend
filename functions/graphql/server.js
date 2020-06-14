const express = require('express');
const { ApolloServer, graphqlConnect } = require('apollo-server-express');
const bodyParser = require('body-parser');

const schema = require('./schema');
const resolvers = require('./resolvers');

const gqlServer = () => {
    const app = express();

    app.use(bodyParser.json());

    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Methods',
            'OPTIONS, GET, POST, PUT, PATCH, DELETE'
        );
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        }
        next();
    });

    app.use((error, req, res, next) => {
        console.log(error, 'my set error');
        const status = error.statusCode || 500;
        const message = error.message;
        const data = error.data;
        res.status(status).json({ message: message, data: data });
    });

    const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        // Enable graphiql gui
        introspection: true,
        playground: true
    });

    apolloServer.applyMiddleware({ app, path: '/', cors: true });


    return app;
}

module.exports = gqlServer;
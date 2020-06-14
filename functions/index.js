const { https } = require('firebase-functions');
const gqlServer = require('./graphql/server');

const server = gqlServer();

// Graphql api
// https://us-central1-<project-name>.cloudfunctions.net/api/
server.listen(4000)
console.log('running on port 4000')
exports.api = https.onRequest(server);


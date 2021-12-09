const express = require('express');
// const path = require('path');

// require authorization from utils/auth later
const db = require('./config/connection.js');

const PORT = process.env.PORT || 3001
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    // context: authMiddleware,
});

async function startup() {
    await server.start();
    server.applyMiddleware({ app });
}
startup();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/build')));
//   }
  
//   // app.use(routes);
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/build/index.html'));
//   });

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server now on port ${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
})
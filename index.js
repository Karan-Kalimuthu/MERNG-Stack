//Declaring modules
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

// Declaring local modules
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');
const { MONGODB } = require('./config');


//Creating server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});


// Connecting to the database and runnning server
mongoose
    .connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('Database connected!');
        return server.listen({ port: 5000 });
    }).then((res) => {
        console.log(`Server is running on port ${res.url}`)
    });


// mongoose
//     .connect(MONGODB, { useNewUrlParser: true })
//     .then(() => {
//         console.log('Database connected!');
//     });

// server.listen({ port: 5000 })
//     .then((res) => {
//         console.log(`Server is running on port ${res.url}`)
//     });
//Declaring modules
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

// Declaring local modules
const { MONGODB } = require('./config');

//declaring Query
const typeDefs = gql`
    type Query {
        sayHi : String!
    }
`;

//declaring Resolver
const resolvers = {
    Query: {
        sayHi: () => 'Hello World!!!!!!!!'
    }
};

//Creating server
const server = new ApolloServer({
    typeDefs,
    resolvers
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
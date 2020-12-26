//Declaring modules
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose');

// Declaring local modules
const Post = require('./models/Post');
const { MONGODB } = require('./config');

//declaring Query Type
const typeDefs = gql`
    type Post {
        id:ID!,
        body: String!,
        createdAt:String!,
        username: String!
    }

    type Query {
        getPosts : [Post]
    }
`;

//declaring Resolver
const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find();
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        }
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
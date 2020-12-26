const { gql } = require('apollo-server');

//declaring Query Type
module.exports = gql`
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
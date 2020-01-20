"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
exports.typeDefs = apollo_server_1.gql `
    type Book {
        id: ID
        title: String
        author: String
        type: BookType
    }

    enum Genre {
        ADVENTURE
        DRAMA
        HORROR
    }

    type BookType {
        id: ID
        leader: String
        genre: Genre
    }

    input typeInput {
        leader: String
        genre: Genre
    }

    type Query {
        books: [Book]!
        getTypes: [BookType]!
        getAType(input: typeInput): BookType
    }

    type Mutation {
        createType(input: typeInput): BookType
    }
`;
//# sourceMappingURL=graphSchema.js.map
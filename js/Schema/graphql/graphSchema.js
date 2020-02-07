"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
    input RegistrationInput {
        email: String
        password: String
    }

    input FetchUserInput {
        email: String
    }

    union RegistrationUnion = UserRegistration | RequestError
    union EmailErrorUnion = EmailType | RequestError

    type UserRegistration {
        registrationType: String
        token: String
    }

    type RequestError {
        errorType: String
        errorMessage: String
    }

    type User {
        id: ID!
        email: String!
        password: String!
        token: String!
        firstName: String
        lastName: String
        userName: String
        image: String
    }

    type EmailType {
        email: String!
    }

    type Query {
        getUsers: [User]
    }

    type Mutation {
        register(input: RegistrationInput): RegistrationUnion
        logIn(input: RegistrationInput): RegistrationUnion
        deleteUser(input: FetchUserInput): EmailErrorUnion
    }
`;
//# sourceMappingURL=graphSchema.js.map
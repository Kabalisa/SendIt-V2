"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
    input RegistrationInput {
        email: String
        password: String
    }

    input EmailInput {
        email: String
    }

    directive @isEmailVerified on FIELD_DEFINITION
    directive @isAdmin on FIELD_DEFINITION

    union RegistrationUnion = UserRegistration | RequestError
    union EmailErrorUnion = EmailType | RequestError
    union GetUsersUnion = GetUsers | RequestError

    enum Role {
        ADMIN
        USER
        SELLER
    }

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
        isVerified: Boolean
        role: Role
    }

    type EmailType {
        email: String!
    }

    type MessageType {
        message: String!
    }

    type GetUsers {
        results: [User]
    }

    type Query {
        getUsers: GetUsersUnion @isAdmin
    }

    type Mutation {
        register(input: RegistrationInput): RegistrationUnion
        logIn(input: RegistrationInput): RegistrationUnion @isEmailVerified
        deleteUser(input: EmailInput): EmailErrorUnion @isAdmin
        validateUser(input: EmailInput): MessageType
    }
`;
//# sourceMappingURL=graphSchema.js.map
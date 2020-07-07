import { gql } from 'apollo-server-express';

export const typeDefs = gql`
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
        provider: String
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

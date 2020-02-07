import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    input RegistrationInput {
        email: String
        password: String
    }

    input EmailInput {
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
        isVerified: Boolean
    }

    type EmailType {
        email: String!
    }

    type MessageType {
        message: String!
    }

    type Query {
        getUsers: [User]
    }

    type Mutation {
        register(input: RegistrationInput): RegistrationUnion
        logIn(input: RegistrationInput): RegistrationUnion
        deleteUser(input: EmailInput): EmailErrorUnion
        validateUser(input: EmailInput): MessageType
    }
`;

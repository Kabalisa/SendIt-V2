import { gql } from 'apollo-server';

export const typeDefs = gql`
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
    leader: String
    genre: Genre
  }

  type Query {
    books: [Book]
  }
`;

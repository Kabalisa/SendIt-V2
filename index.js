const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
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

const books = [
  {
    id: 1,
    title: 'Harry Potter and the Chamber of Secrets',
    author: 'J.K. Rowling'
  },
  {
    id: 2,
    title: 'Jurassic Park',
    author: 'Michael Crichton'
  }
];

const bookType = [
  { leader: 'fiston', genre: 'ADVENTURE' },
  { leader: 'kabalisa', genre: 'HORROR' }
];

const resolvers = {
  Query: {
    books: () => books
  },
  Book: {
    type({ id }) {
      if (id === 1) return bookType[0];
      else return bookType[1];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

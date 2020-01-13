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

export const resolvers = {
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

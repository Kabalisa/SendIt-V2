import { BookModel } from '../models/mongoModels';
import { TypeModel } from '../models/mongoModels';

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
  { id: 1, leader: 'fiston', genre: 'ADVENTURE' },
  { id: 2, leader: 'kabalisa', genre: 'HORROR' }
];

export const resolvers = {
  Query: {
    books: () => books,
    getTypes: () => TypeModel.find(),
    getAType: (_, { input }) => TypeModel.findOne(input)
  },
  Mutation: {
    createType(_, { input }) {
      const type = new TypeModel(input);
      return type.save();
    }
  },
  Book: {
    type({ id }) {
      if (id === 1) return bookType[0];
      else return bookType[1];
    }
  }
};

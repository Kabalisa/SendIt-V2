import { BookModel } from '../models/mongoModels';
import { TypeModel } from '../models/mongoModels';
import { IdOnlyType, Book, BookType, Genre } from '../interfaces/interfaces';

const books: Array<Book> = [
    {
        id: '1',
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        id: '2',
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const bookType: Array<BookType> = [
    { id: '1', leader: 'fiston', genre: Genre.ADVENTURE },
    { id: '2', leader: 'kabalisa', genre: Genre.HORROR },
];

export const resolvers = {
    Query: {
        books: () => books,
        getTypes: () => TypeModel.find(),
        getAType: (_: any, { input }: any) => TypeModel.findOne(input),
    },
    Mutation: {
        createType(_: any, { input }: any) {
            const type = new TypeModel(input);
            return type.save();
        },
    },
    Book: {
        type({ id }: IdOnlyType) {
            if (id === '1') return bookType[0];
            else return bookType[1];
        },
    },
};

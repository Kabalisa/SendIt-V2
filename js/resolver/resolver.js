"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoModels_1 = require("../models/mongoModels");
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
exports.resolvers = {
    Query: {
        books: () => books,
        getTypes: () => mongoModels_1.TypeModel.find(),
        getAType: (_, { input }) => mongoModels_1.TypeModel.findOne(input)
    },
    Mutation: {
        createType(_, { input }) {
            const type = new mongoModels_1.TypeModel(input);
            return type.save();
        }
    },
    Book: {
        type({ id }) {
            if (id === 1)
                return bookType[0];
            else
                return bookType[1];
        }
    }
};
//# sourceMappingURL=resolver.js.map
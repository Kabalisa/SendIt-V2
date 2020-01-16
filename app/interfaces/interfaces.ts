import { Document } from 'mongoose';

export interface BookModelInt extends Document {
    title: string;
    author: string;
    typeId: string;
}

export interface BookTypeModel extends Document {
    leader: string;
    genre: string;
}
export interface IdOnlyType {
    id: string;
}

export type Book = {
    id: string;
    title: string;
    author: string;
    type?: BookType;
};

export enum Genre {
    ADVENTURE,
    DRAMA,
    HORROR,
}

export type BookType = {
    id: string;
    leader: string;
    genre: Genre;
};

// type ResolverFn = (_: any, args: any, ctx: any) => any;
// interface ResolverMap {
//   [field: string]: ResolverFn;
// }

// export interface Resolvers {
//   Query: ResolverMap;
//   Mutation: ResolverMap;
//   Book: ResolverMap;
// }

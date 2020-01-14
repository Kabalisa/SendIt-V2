import { Document } from 'mongoose';

export interface BookModelInt extends Document {
  title: String;
  author: String;
  typeId: String;
}

export interface BookTypeModel extends Document {
  leader: String;
  genre: String;
}
export interface IdOnlyType {
  id: String;
}

export type Book = {
  id: String;
  title: String;
  author: String;
  type?: BookType;
};

export enum Genre {
  ADVENTURE,
  DRAMA,
  HORROR
}

export type BookType = {
  id: String;
  leader: String;
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

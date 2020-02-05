import { Document } from 'mongoose';

export interface UserModelInt extends Document {
    email: string;
    password: string;
    token: string;
    firstName: string;
    lastName: string;
    userName: string;
    image: string;
}

// type ResolverFn = (_: any, args: any, ctx: any) => any;
// interface ResolverMap {
//   [field: string]: ResolverFn;
// }

// export interface Resolvers {
//   Query: ResolverMap;
//   Mutation: ResolverMap;
//   Book: ResolverMap;
// }

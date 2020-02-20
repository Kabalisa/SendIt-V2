/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

// export class IsAdminDirective extends SchemaDirectiveVisitor {
//     visitFieldDefinition(field: any) {
//         const { resolve = defaultFieldResolver } = field;

//         field.resolve = async function(...args: any) {
//             let _, __, UserModel, currentUser;
//             [_, __, { UserModel, currentUser }] = args;
//             const user = await UserModel.findOne({ email: currentUser.email }, (err: any, user: any) => {
//                 return user;
//             });
//             if (user.role === 'ADMIN') {
//                 const result = await resolve.apply(this, args);
//                 return result;
//             } else {
//                 throw new Error('you are not the admin');
//             }
//         };
//     }
// }

//refactor after implementing the logout feature.

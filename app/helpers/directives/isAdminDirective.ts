/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

export class IsAdminDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any) {
        const { resolve = defaultFieldResolver } = field;

        field.resolve = async function(...args: any) {
            let _, __, UserModel, currentUser, errorMessage;
            const authenticationError = 'authentication error';
            const authorizationError = 'authorization error';

            [_, __, { UserModel, currentUser, errorMessage }] = args;

            if (errorMessage) {
                return { errorType: authenticationError, errorMessage };
            }
            const user = await UserModel.findOne({ email: currentUser.email }, (err: any, user: any) => {
                return user;
            });

            if (!user) {
                return { errorType: authenticationError, errorMessage: 'the current user do not exist' };
            } else if (!user.isVerified) {
                return { errorType: authenticationError, errorMessage: 'verify your email to continue' };
            } else if (user.role !== 'ADMIN') {
                return { errorType: authorizationError, errorMessage: 'Admin is required for this operation' };
            } else {
                const result = await resolve.apply(this, args);
                return result;
            }
        };
    }
}

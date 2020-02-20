/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

export class IsVerifiedDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field: any) {
        const { resolve = defaultFieldResolver } = field;

        field.resolve = async function(...args: any) {
            let _, input, UserModel;
            [_, { input }, { UserModel }] = args;
            const user = await UserModel.findOne({ email: input.email }, (err: any, user: any) => {
                return user;
            });
            const errorType = 'user login in error';
            if (!user) {
                return { errorType, errorMessage: 'user does not exists' };
            } else if (!user.isVerified) {
                return { errorType, errorMessage: 'verify your email first' };
            } else {
                const result = await resolve.apply(this, args);
                return result;
            }
        };
    }
}

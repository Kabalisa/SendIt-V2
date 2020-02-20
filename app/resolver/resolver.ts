export const resolvers = {
    RegistrationUnion: {
        __resolveType(obj: any) {
            if (obj.token) {
                return 'UserRegistration';
            }
            if (obj.errorMessage) {
                return 'RequestError';
            }
        },
    },
    EmailErrorUnion: {
        __resolveType(obj: any) {
            if (obj.email) {
                return 'EmailType';
            }
            if (obj.errorMessage) {
                return 'RequestError';
            }
        },
    },
    GetUsersUnion: {
        __resolveType(obj: any) {
            if (obj.results) {
                return 'GetUsers';
            }
            if (obj.errorMessage) {
                return 'RequestError';
            }
        },
    },
    Query: {
        getUsers: (_: any, __: any, context: any) => {
            const { UserModel, AuthHelper } = context;
            const results = AuthHelper.fetchUsers(UserModel);
            return { results };
        },
    },
    Mutation: {
        register: async (_: any, { input }: any, context: any) => {
            const { UserModel, AuthHelper } = context;
            const result = await AuthHelper.createUser(input, { UserModel, AuthHelper });
            const results =
                result === 'send email failed'
                    ? {
                          errorType: 'user sign up error',
                          errorMessage: 'verification email not sent',
                      }
                    : result === null
                    ? {
                          errorType: 'user sign up error',
                          errorMessage: 'the user already exists',
                      }
                    : {
                          registrationType: 'user sign up successful. please check your email to verify it.',
                          token: result,
                      };
            return results;
        },
        logIn: async (_: any, { input }: any, context: any) => {
            const { UserModel, AuthHelper } = context;
            const result = await AuthHelper.loginUser(input, { UserModel, AuthHelper });
            return result;
        },
        deleteUser: async (_: any, { input }: any, context: any) => {
            const { UserModel, AuthHelper } = context;
            const userDeleted = await AuthHelper.deleteUser(input, { UserModel });
            const results = userDeleted
                ? { email: userDeleted }
                : {
                      errorType: 'delete user error',
                      errorMessage: 'verify the user being deleted',
                  };
            return results;
        },
        validateUser: async (_: any, { input }: any, context: any) => {
            const { UserModel, AuthHelper } = context;
            const result = await AuthHelper.validateUser(input, { UserModel, AuthHelper });
            return result;
        },
    },
};

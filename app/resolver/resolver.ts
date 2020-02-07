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
    Query: {
        getUsers: (_: any, __: any, { UserModel, AuthHelper }: any) => {
            const results = AuthHelper.fetchUsers(UserModel);
            return results;
        },
    },
    Mutation: {
        register: async (_: any, { input }: any, { UserModel, AuthHelper }: any) => {
            const token = await AuthHelper.createUser(input, { UserModel, AuthHelper });
            const results = token
                ? {
                      registrationType: 'user sign up',
                      token,
                  }
                : {
                      errorType: 'user sign up error',
                      errorMessage: 'the user already exists',
                  };
            return results;
        },
        logIn: async (_: any, { input }: any, { UserModel, AuthHelper }: any) => {
            const result = await AuthHelper.loginUser(input, { UserModel, AuthHelper });
            return result;
        },
        deleteUser: async (_: any, { input }: any, { UserModel, AuthHelper }: any) => {
            const userDeleted = await AuthHelper.deleteUser(input, { UserModel });
            const results = userDeleted
                ? { email: userDeleted }
                : {
                      errorType: 'delete user error',
                      errorMessage: 'verify the user being deleted',
                  };
            return results;
        },
    },
};

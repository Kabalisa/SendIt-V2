"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = {
    RegistrationUnion: {
        __resolveType(obj) {
            if (obj.token) {
                return 'UserRegistration';
            }
            if (obj.errorMessage) {
                return 'RequestError';
            }
        },
    },
    EmailErrorUnion: {
        __resolveType(obj) {
            if (obj.email) {
                return 'EmailType';
            }
            if (obj.errorMessage) {
                return 'RequestError';
            }
        },
    },
    Query: {
        getUsers: (_, __, { UserModel, AuthHelper }) => {
            const results = AuthHelper.fetchUsers(UserModel);
            return results;
        },
    },
    Mutation: {
        register: (_, { input }, { UserModel, AuthHelper }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = yield AuthHelper.createUser(input, { UserModel, AuthHelper });
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
        }),
        deleteUser: (_, { input }, { UserModel, AuthHelper }) => __awaiter(void 0, void 0, void 0, function* () {
            const userDeleted = yield AuthHelper.deleteUser(input, { UserModel });
            const results = userDeleted
                ? { email: userDeleted }
                : {
                    errorType: 'delete user error',
                    errorMessage: 'verify the user being deleted',
                };
            return results;
        }),
    },
};
//# sourceMappingURL=resolver.js.map
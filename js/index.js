"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const mongoose_1 = __importDefault(require("mongoose"));
const graphSchema_1 = require("./Schema/graphql/graphSchema");
const resolver_1 = require("./resolver/resolver");
const mongoModels_1 = require("./models/mongoModels");
const authHelper_1 = require("./helpers/authHelper");
const index_1 = require("./helpers/directives/index");
const env = process.env.NODE_ENV;
const { SECRET } = process.env;
const TOKENHEADER = 'authorization';
const url = env === 'test' ? 'mongodb://localhost:27017' : 'mongodb://localhost:27018/send-it-v2';
mongoose_1.default.connect(url, { useNewUrlParser: true });
const db = mongoose_1.default.connection;
db.on('error', console.log.bind(console, 'conection error:'));
db.once('open', function () {
    console.log('we are connected !!!!');
});
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: graphSchema_1.typeDefs,
    resolvers: resolver_1.resolvers,
    schemaDirectives: index_1.schemaDirectives,
    context: ({ req }) => {
        const token = req.headers[TOKENHEADER];
        let currentUser = null;
        let errorMessage = null;
        try {
            if (token) {
                currentUser = authHelper_1.AuthHelper.decodeToken(token)(SECRET);
            }
            else {
                errorMessage = 'no token provided';
            }
        }
        catch (error) {
            errorMessage = error.message;
        }
        return { UserModel: mongoModels_1.UserModel, AuthHelper: authHelper_1.AuthHelper, currentUser, errorMessage };
    },
});
exports.apolloServer = server;
const app = express_1.default();
exports.expressServer = app;
server.applyMiddleware({ app });
const port = process.env.PORT;
app.listen({ port }, () => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map
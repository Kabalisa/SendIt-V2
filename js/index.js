"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const graphSchema_1 = require("./Schema/graphql/graphSchema");
const resolver_1 = require("./resolver/resolver");
const url = 'mongodb://localhost:27018';
mongoose_1.default.connect(url, { useNewUrlParser: true });
const db = mongoose_1.default.connection;
db.on('error', console.log.bind(console, 'conection erro:'));
db.once('open', function () {
    console.log('we are connected !!!!');
});
const server = new apollo_server_1.ApolloServer({ typeDefs: graphSchema_1.typeDefs, resolvers: resolver_1.resolvers });
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map
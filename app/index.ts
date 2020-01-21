import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';

import { typeDefs } from './Schema/graphql/graphSchema';
import { resolvers } from './resolver/resolver';
import { UserModel } from './models/mongoModels';
import { AuthHelper } from './helpers/authHelper';

const env = process.env.NODE_ENV;
const url = env === 'test' ? 'mongodb://localhost:27017' : 'mongodb://localhost:27018/send-it-v2';

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'conection error:'));
db.once('open', function() {
    console.log('we are connected !!!!');
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
        return { UserModel, AuthHelper };
    },
});

const app = express();
server.applyMiddleware({ app });

const port = process.env.PORT;

// The `listen` method launches a web server.
app.listen({ port }, () => {
    console.log(`🚀  Server ready at ${url}`);
});

export { server as apolloServer, app as expressServer };

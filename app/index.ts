import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import passport from 'passport';

import { typeDefs } from './Schema/graphql/graphSchema';
import { resolvers } from './resolver/resolver';
import { UserModel } from './models/mongoModels';
import { AuthHelper } from './helpers/authHelper';
import { schemaDirectives } from './helpers/directives/index';
import routes from './socialAuth/index';

const env = process.env.NODE_ENV;
const { SECRET } = process.env;
const TOKENHEADER = 'authorization';
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
    schemaDirectives,
    context: ({ req }) => {
        const token = req.headers[TOKENHEADER];
        let currentUser: any = null;
        let errorMessage: string | null = null;

        try {
            if (token) {
                currentUser = AuthHelper.decodeToken(token)(SECRET);
            } else {
                errorMessage = 'no token provided';
            }
        } catch (error) {
            errorMessage = error.message;
        }

        return { UserModel, AuthHelper, currentUser, errorMessage };
    },
});

const app = express();
app.use(passport.initialize());
app.use(routes);
server.applyMiddleware({ app });

const port = process.env.PORT;

// The `listen` method launches a web server.
app.listen({ port }, () => {
    console.log(`🚀  Server ready at ${port}`);
});

export { server as apolloServer, app as expressServer };

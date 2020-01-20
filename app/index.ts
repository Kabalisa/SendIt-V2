import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';

import { typeDefs } from './Schema/graphql/graphSchema';
import { resolvers } from './resolver/resolver';

const env = process.env.NODE_ENV;
const url = env === 'test' ? 'mongodb://localhost:27017' : 'mongodb://localhost:27018';

mongoose.connect(url, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.log.bind(console, 'conection erro:'));
db.once('open', function() {
    console.log('we are connected !!!!');
});

export const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

import { ApolloServer } from 'apollo-server';

import { typeDefs } from './Schema/graphql/graphSchema';
import { resolvers } from './resolver/resolver';

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

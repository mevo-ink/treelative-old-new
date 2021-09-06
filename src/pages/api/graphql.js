import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import schema from 'graphql/server/schema'

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
})

const startServer = apolloServer.start()

export default async (req, res) => {
  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false
  }
}

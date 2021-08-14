import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import schema from 'server/schema'

import dbConnect from 'server/mongo/dbConnect'
import models from 'server/mongo/models'

import { authenticateUserToken } from 'server/utils/authentication'

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({ req }) => {
    // connect to mongo
    await dbConnect()
    // authenticate the user (if auth header is present) and add to context
    const user = await authenticateUserToken(req, models)
    // also add mongoose models to the context
    return {
      user,
      models
    }
  }
})

const startServer = apolloServer.start()

export default async function handler (req, res) {
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

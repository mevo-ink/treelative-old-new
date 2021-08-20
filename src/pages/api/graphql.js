import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import { schema } from 'server/schema'

import admin from 'server/utils/firebase'
import db from 'server/utils/firebase/database'
import storage from 'server/utils/firebase/storage'

import { authenticateUserToken } from 'server/utils/authentication'

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async ({ req }) => {
    // authenticate the user (if auth header is present) and add to context
    console.log(req)
    const user = await authenticateUserToken(req, db)
    // also add firebase utils to the context
    return {
      user,
      admin,
      db,
      storage
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

import { ApolloServer } from 'apollo-server-micro'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'

import schema from 'graphql/server/schema'

import nookies from 'nookies'

import dbConnect from 'utils/mongodb'

const apolloServer = new ApolloServer({
  schema,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: async (ctx) => {
    const db = await dbConnect()
    return {
      res: ctx.res,
      req: ctx.req,
      db,
      cookies: nookies.get(ctx)
    }
  }
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

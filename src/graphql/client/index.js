import { GraphQLClient, gql } from 'graphql-request'

const endpoint = '/api/graphql'

const graphQLClient = new GraphQLClient(endpoint, {
  credentials: 'include',
  mode: 'cors'
})

export { graphQLClient, gql }

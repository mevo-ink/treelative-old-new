import { graphQLClient, gql } from 'graphql/client'

export const whoAmI = async () => {
  const { whoAmI } = await graphQLClient.request(
    gql`
      query WHO_AM_I {
        whoAmI
      }
    `
  )
  return whoAmI
}

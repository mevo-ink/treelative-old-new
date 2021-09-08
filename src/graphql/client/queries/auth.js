import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useWhoAmI = () => {
  return useQuery(
    ['whoAmI'],
    async () => {
      const { whoAmI } = await graphQLClient.request(
        gql`query WHO_AM_I { whoAmI }`
      )
      return whoAmI
    }
  )
}

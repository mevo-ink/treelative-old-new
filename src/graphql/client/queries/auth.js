import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'

export const useWhoAmI = () => {
  return useQuery(
    ['whoAmI'],
    async () => {
      const { whoAmI } = await request(
        '/api/graphql',
        gql`query { whoAmI }`
      )
      return whoAmI
    }
  )
}

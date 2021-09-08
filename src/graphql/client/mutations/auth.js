import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useLoginWithProvider = (email, token) => {
  return useQuery(
    ['loginWithProvider', email, token],
    async () => {
      const { loginWithProvider } = await graphQLClient.request(
        gql`mutation LOGIN_WITH_PROVIDER ($email: String! $token: String!) { loginWithProvider(email: $email token: $token) }`,
        { email, token }
      )
      return loginWithProvider
    }
  )
}

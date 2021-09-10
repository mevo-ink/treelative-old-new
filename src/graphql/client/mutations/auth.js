import { graphQLClient, gql } from 'graphql/client'

export const loginWithProvider = async (variables) => {
  try {
    const { loginWithProvider } = await graphQLClient.request(
      gql`
      mutation LOGIN_WITH_PROVIDER ($email: String! $token: String!) {
        loginWithProvider (email: $email token: $token)
      }
    `,
      variables
    )
    return loginWithProvider
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

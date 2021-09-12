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

export const connectUserEmail = async (variables) => {
  try {
    const { connectUserEmail } = await graphQLClient.request(
      gql`
      mutation LOGIN_WITH_PROVIDER ($userID: String! $email: String! $token: String!) {
        connectUserEmail (userID: $userID email: $email token: $token)
      }
    `,
      variables
    )
    return connectUserEmail
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const verifyUser = async (variables) => {
  try {
    const { verifyUser } = await graphQLClient.request(
      gql`
        mutation VERIFY_USER ($userID: String! $isVerified: Boolean!) {
          verifyUser (userID: $userID isVerified: $isVerified)
        }
      `,
      variables
    )
    return verifyUser
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

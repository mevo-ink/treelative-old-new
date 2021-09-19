import { graphQLClient, gql } from 'graphql/client'

export const sendFCMToken = async (variables) => {
  try {
    const { sendFCMToken } = await graphQLClient.request(
      gql`
        mutation SEND_FCM_TOKEN ($token: String! $fingerprint: String! $browser: String) {
          sendFCMToken (token: $token fingerprint: $fingerprint browser: $browser)
        }
      `,
      variables
    )
    return sendFCMToken
  } catch (error) {
    // no need to throw error, just return false
    return false
  }
}

export const loginWithEmail = async (variables) => {
  try {
    const { loginWithEmail } = await graphQLClient.request(
      gql`
      mutation LOGIN_WITH_PROVIDER ($email: String! $token: String!) {
        loginWithEmail (email: $email token: $token)
      }
    `,
      variables
    )
    return loginWithEmail
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const loginWithPhoneNumber = async (variables) => {
  try {
    const { loginWithPhoneNumber } = await graphQLClient.request(
      gql`
      mutation LOGIN_WITH_PROVIDER ($phoneNumber: String! $token: String!) {
        loginWithPhoneNumber (phoneNumber: $phoneNumber token: $token)
      }
    `,
      variables
    )
    return loginWithPhoneNumber
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const connectUserEmail = async (variables) => {
  try {
    const { connectUserEmail } = await graphQLClient.request(
      gql`
      mutation CONNECT_USER_EMAIL ($userID: String! $email: String! $token: String!) {
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

export const connectUserPhoneNumber = async (variables) => {
  try {
    const { connectUserPhoneNumber } = await graphQLClient.request(
      gql`
      mutation CONNECT_USER_PHONE_NUMBER ($userID: String! $phoneNumber: String! $token: String!) {
        connectUserPhoneNumber (userID: $userID phoneNumber: $phoneNumber token: $token)
      }
    `,
      variables
    )
    return connectUserPhoneNumber
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

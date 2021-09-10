import { graphQLClient, gql } from 'graphql/client'

export const whoAmI = async () => {
  try {
    const { whoAmI } = await graphQLClient.request(
      gql`
        query WHO_AM_I {
          whoAmI
        }
      `
    )
    return whoAmI
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

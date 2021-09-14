import { graphQLClient, gql } from 'graphql/client'

export const createUser = async (variables) => {
  try {
    const { createUser } = await graphQLClient.request(
      gql`
        mutation CREATE_USER ($input: CreateUserInput! $token: String) {
          createUser (input: $input token: $token)
        }
      `,
      variables
    )
    return createUser
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const updateUserAvatar = async (variables) => {
  try {
    const { updateUserAvatar } = await graphQLClient.request(
      gql`
        mutation UPDATE_USER_AVATAR ($userID: String!) {
          updateUserAvatar (userID: $userID)
        }
      `,
      variables
    )
    return updateUserAvatar
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const updateUserGeneral = async (variables) => {
  try {
    const { updateUserGeneral } = await graphQLClient.request(
      gql`
        mutation UPDATE_USER_GENERAL ($userID: String! $input: UpdateUserGeneralInput!) {
          updateUserGeneral (userID: $userID input: $input)
        }
      `,
      variables
    )
    return updateUserGeneral
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const updateUserSocial = async (variables) => {
  try {
    const { updateUserSocial } = await graphQLClient.request(
      gql`
        mutation UPDATE_USER_SOCIAL ($userID: String! $input: UpdateUserSocialInput!) {
          updateUserSocial (userID: $userID input: $input)
        }
      `,
      variables
    )
    return updateUserSocial
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const deleteUser = async (variables) => {
  try {
    const { deleteUser } = await graphQLClient.request(
      gql`
        mutation DELETE_USER ($userID: String!) {
          deleteUser (userID: $userID)
        }
      `,
      variables
    )
    return deleteUser
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

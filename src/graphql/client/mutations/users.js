import { graphQLClient, gql } from 'graphql/client'

export const createUser = async (variables) => {
  const { createUser } = await graphQLClient.request(
    gql`
      mutation CREATE_USER ($input: CreateUserInput!) {
        createUser (input: $input)
      }
    `,
    variables
  )
  return createUser
}

export const updateUserAvatar = async (variables) => {
  const { updateUserAvatar } = await graphQLClient.request(
    gql`
      mutation UPDATE_USER_AVATAR ($userID: String!) {
        updateUserAvatar (userID: $userID)
      }
    `,
    variables
  )
  return updateUserAvatar
}

export const updateUserGeneral = async (variables) => {
  const { updateUserGeneral } = await graphQLClient.request(
    gql`
      mutation UPDATE_USER_GENERAL ($userID: String! $input: UpdateUserGeneralInput!) {
        updateUserGeneral (userID: $userID input: $input)
      }
    `,
    variables
  )
  return updateUserGeneral
}

export const updateUserSocial = async (variables) => {
  const { updateUserSocial } = await graphQLClient.request(
    gql`
      mutation UPDATE_USER_SOCIAL ($userID: String! $input: UpdateUserSocialInput!) {
        updateUserSocial (userID: $userID input: $input)
      }
    `,
    variables
  )
  return updateUserSocial
}

export const deleteUser = async (variables) => {
  const { deleteUser } = await graphQLClient.request(
    gql`
      mutation DELETE_USER ($userID: String!) {
        deleteUser (userID: $userID)
      }
    `,
    variables
  )
  return deleteUser
}

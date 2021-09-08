import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useCreateUser = (input) => {
  return useQuery(
    ['createUser', input],
    async () => {
      const { createUser } = await graphQLClient.request(
        gql`mutation CREATE_USER ($input: CreateUserInput!) { createUser(input: $input) }`,
        { input }
      )
      return createUser
    }
  )
}

export const useUpdateUserAvatar = (userID) => {
  return useQuery(
    ['updateUserAvatar', userID],
    async () => {
      const { updateUserAvatar } = await graphQLClient.request(
        gql`mutation UPDATE_AVATAR ($userID: String!) { updateUserAvatar(userID: $userID) }`,
        { userID }
      )
      return updateUserAvatar
    }
  )
}

export const useUpdateUserGeneral = (userID, input) => {
  return useQuery(
    ['updateUserGeneral', userID, input],
    async () => {
      const { updateUserGeneral } = await graphQLClient.request(
        gql`mutation UPDATE_FULL_NAME ($userID: String! $input: UpdateUserGeneralInput!) { updateUserGeneral(userID: $userID input: $input) }`,
        { userID, input }
      )
      return updateUserGeneral
    }
  )
}

export const useUpdateUserSocial = (userID, input) => {
  return useQuery(
    ['updateUserSocial', userID, input],
    async () => {
      const { updateUserSocial } = await graphQLClient.request(
        gql`mutation UPDATE_FULL_NAME ($userID: String! $input: UpdateUserSocialInput!) { updateUserSocial(userID: $userID input: $input) }`,
        { userID, input }
      )
      return updateUserSocial
    }
  )
}

export const useDeleteUser = (userID) => {
  return useQuery(
    ['deleteUser', userID],
    async () => {
      const { deleteUser } = await graphQLClient.request(
        gql`mutation DELETE_USER ($userID: String!) { deleteUser(userID: $userID) }`,
        { userID }
      )
      return deleteUser
    }
  )
}

import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useAddUserParent = (userID, parentID) => {
  return useQuery(
    ['addUserParent', userID, parentID],
    async () => {
      const { addUserParent } = await graphQLClient.request(
        gql`mutation ADD_USER_PARENT ($userID: String! $parentID: String!) { addUserParent(userID: $userID parentID: $parentID) }`,
        { userID, parentID }
      )
      return addUserParent
    }
  )
}

export const useAddUserChild = (userID, childID) => {
  return useQuery(
    ['addUserChild', userID, childID],
    async () => {
      const { addUserChild } = await graphQLClient.request(
        gql`mutation ADD_USER_CHILD ($userID: String! $childID: String!) { addUserChild(userID: $userID childID: $childID) }`,
        { userID, childID }
      )
      return addUserChild
    }
  )
}

export const useAddUserPartner = (userID, partnerID) => {
  return useQuery(
    ['addUserPartner', userID, partnerID],
    async () => {
      const { addUserPartner } = await graphQLClient.request(
        gql`mutation ADD_USER_PARTNER ($userID: String! $partnerID: String!) { addUserPartner(userID: $userID partnerID: $partnerID) }`,
        { userID, partnerID }
      )
      return addUserPartner
    }
  )
}

export const useRemoveUserParent = (userID, parentID) => {
  return useQuery(
    ['removeUserParent', userID, parentID],
    async () => {
      const { removeUserParent } = await graphQLClient.request(
        gql`mutation REMOVE_USER_PARENT ($userID: String! $parentID: String!) { removeUserParent(userID: $userID parentID: $parentID) }`,
        { userID, parentID }
      )
      return removeUserParent
    }
  )
}

export const useRemoveUserChild = (userID, childID) => {
  return useQuery(
    ['removeUserChild', userID, childID],
    async () => {
      const { removeUserChild } = await graphQLClient.request(
        gql`mutation REMOVE_USER_CHILD ($userID: String! $childID: String!) { removeUserChild(userID: $userID childID: $childID) }`,
        { userID, childID }
      )
      return removeUserChild
    }
  )
}

export const useRemoveUserPartner = (userID, partnerID) => {
  return useQuery(
    ['removeUserPartner', userID, partnerID],
    async () => {
      const { removeUserPartner } = await graphQLClient.request(
        gql`mutation REMOVE_USER_PARTNER ($userID: String! $partnerID: String!) { removeUserPartner(userID: $userID partnerID: $partnerID) }`,
        { userID, partnerID }
      )
      return removeUserPartner
    }
  )
}

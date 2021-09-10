import { graphQLClient, gql } from 'graphql/client'

export const searchUsers = async ({ queryKey }) => {
  try {
    const [, variables] = queryKey
    const { searchUsers } = await graphQLClient.request(
      gql`
        query SEARCH_USERS ($query: String!) {
          searchUsers (query: $query)
        }
      `,
      variables
    )
    return searchUsers
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const searchLocations = async ({ queryKey }) => {
  try {
    const [, variables] = queryKey
    const { searchLocations } = await graphQLClient.request(
      gql`
        query SEARCH_LOCATIONS ($query: String!) {
          searchLocations (query: $query)
        }
      `,
      variables
    )
    return searchLocations
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const searchUserPartners = async ({ queryKey }) => {
  try {
    const [, variables] = queryKey
    const { searchUserPartners } = await graphQLClient.request(
      gql`
        query SEARCH_USER_PARTNERS ($userID: String! $query: String) {
          searchUserPartners (userID: $userID query: $query)
        }
      `,
      variables
    )
    return searchUserPartners
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const searchUserParents = async ({ queryKey }) => {
  try {
    const [, variables] = queryKey
    const { searchUserParents } = await graphQLClient.request(
      gql`
        query SEARCH_USER_PARENTS ($userID: String! $query: String) {
          searchUserParents (userID: $userID query: $query)
        }
      `,
      variables
    )
    return searchUserParents
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const searchUserChildren = async ({ queryKey }) => {
  try {
    const [, variables] = queryKey
    const { searchUserChildren } = await graphQLClient.request(
      gql`
        query SEARCH_USER_CHILDREN ($userID: String! $query: String) {
          searchUserChildren (userID: $userID query: $query)
        }
      `,
      variables
    )
    return searchUserChildren
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const searchNewUsers = async ({ queryKey }) => {
  try {
    const [, variables] = queryKey
    const { searchNewUsers } = await graphQLClient.request(
      gql`
        query SEARCH_NEW_USERS ($query: String) {
          searchNewUsers (query: $query)
        }
      `,
      variables
    )
    return searchNewUsers
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

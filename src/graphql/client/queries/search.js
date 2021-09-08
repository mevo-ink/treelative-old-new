import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useSearchUsers = (query) => {
  return useQuery(
    ['searchUsers', query],
    async () => {
      const { searchUsers } = await graphQLClient.request(
        gql`query SEARCH_USERS ($query: String!) { searchUsers(query: $query) }`,
        { query }
      )
      return searchUsers
    },
    { enabled: !!query }
  )
}

export const useSearchLocations = (query) => {
  return useQuery(
    ['searchLocations', query],
    async () => {
      const { searchLocations } = await graphQLClient.request(
        gql`query SEARCH_LOCATIONS ($query: String!) { searchLocations(query: $query) }`,
        { query }
      )
      return searchLocations
    },
    { enabled: !!query }
  )
}

export const useSearchUserPartners = (userID, query) => {
  return useQuery(
    ['searchUserPartners', userID, query],
    async () => {
      const { searchUserPartners } = await graphQLClient.request(
        gql`query SEARCH_USER_PARTNERS ($userID: String! $query: String) { searchUserPartners(userID: $userID query: $query) }`,
        { userID, query }
      )
      return searchUserPartners
    },
    { enabled: !!userID }
  )
}

export const useSearchUserParents = (userID, query) => {
  return useQuery(
    ['searchUserParents', userID, query],
    async () => {
      const { searchUserParents } = await graphQLClient.request(
        gql`query SEARCH_USER_PARENTS ($userID: String! $query: String) { searchUserParents(userID: $userID query: $query) }`,
        { userID, query }
      )
      return searchUserParents
    },
    { enabled: !!userID }
  )
}

export const useSearchUserChildren = (userID, query) => {
  return useQuery(
    ['searchUserChildren', userID, query],
    async () => {
      const { searchUserChildren } = await graphQLClient.request(
        gql`query SEARCH_USER_CHILDREN ($userID: String! $query: String) { searchUserChildren(userID: $userID query: $query) }`,
        { userID, query }
      )
      return searchUserChildren
    },
    { enabled: !!userID }
  )
}

export const useSearchNewUsers = (query) => {
  return useQuery(
    ['searchNewUsers', query],
    async () => {
      const { searchNewUsers } = await graphQLClient.request(
        gql`query SEARCH_NEW_USERS ($query: String) { searchNewUsers(query: $query) }`,
        { query }
      )
      return searchNewUsers
    }
  )
}

import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'

export const useSearchUsers = (query) => {
  return useQuery(
    ['searchUsers', query],
    async () => {
      const { searchUsers } = await request(
        '/api/graphql',
        gql`query { searchUsers(query: "${query}") }`
      )
      return searchUsers
    }
  )
}

export const useSearchLocations = (query) => {
  return useQuery(
    ['searchLocations', query],
    async () => {
      const { searchLocations } = await request(
        '/api/graphql',
        gql`query { searchLocations(query: "${query}") }`
      )
      return searchLocations
    },
    { enabled: !!query }
  )
}

export const useSearchPartners = (userID, query) => {
  return useQuery(
    ['searchPartners', userID, query],
    async () => {
      const { searchPartners } = await request(
        '/api/graphql',
        gql`query { searchPartners(userID: "${userID}" query: "${query}") }`
      )
      return searchPartners
    }
  )
}

export const useSearchParents = (userID, query) => {
  return useQuery(
    ['searchParents', userID, query],
    async () => {
      const { searchParents } = await request(
        '/api/graphql',
        gql`query { searchParents(userID: "${userID}" query: "${query}") }`
      )
      return searchParents
    }
  )
}

export const useSearchChildren = (userID, query) => {
  return useQuery(
    ['searchChildren', userID, query],
    async () => {
      const { searchChildren } = await request(
        '/api/graphql',
        gql`query { searchChildren(userID: "${userID}" query: "${query}") }`
      )
      return searchChildren
    }
  )
}

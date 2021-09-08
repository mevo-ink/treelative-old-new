import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'

export const useGetUser = (userID) => {
  return useQuery(
    ['getUser', userID],
    async () => {
      const { getUser } = await request(
        '/api/graphql',
        gql`query { getUser(id: "${userID}") }`
      )
      return getUser
    },
    { enabled: !!userID }
  )
}

export const useUsersByCountry = (country) => {
  return useQuery(
    ['getUsersByCountry', country],
    async () => {
      const { getUsersByCountry } = await request(
        '/api/graphql',
        gql`query { getUsersByCountry(country: "${country}") }`
      )
      return getUsersByCountry
    }
  )
}

export const useUsersByAges = (ages) => {
  return useQuery(
    ['getUsersByAges', ages],
    async () => {
      const { getUsersByAges } = await request(
        '/api/graphql',
        gql`query { getUsersByAges(ages: "${ages}") }`
      )
      return getUsersByAges
    }
  )
}

export const useContactUsers = () => {
  return useQuery(
    ['getContactUsers'],
    async () => {
      const { getContactUsers } = await request(
        '/api/graphql',
        gql`query { getContactUsers }`
      )
      return getContactUsers
    }
  )
}

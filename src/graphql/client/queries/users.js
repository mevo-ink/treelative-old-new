import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useGetUser = (id) => {
  return useQuery(
    ['getUser', id],
    async () => {
      const { getUser } = await graphQLClient.request(
        gql`query GET_USER ($id: String!) { getUser(id: $id) }`,
        { id }
      )
      return getUser
    },
    { enabled: !!id }
  )
}

export const useGetUsersByCountry = (country) => {
  return useQuery(
    ['getUsersByCountry', country],
    async () => {
      const { getUsersByCountry } = await graphQLClient.request(
        gql`query GET_USERS_BY_COUNTRY ($country: String!) { getUsersByCountry(country: $country) }`,
        { country }
      )
      return getUsersByCountry
    },
    { enabled: !!country }
  )
}

export const useGetUsersByAgeRange = (ageRange) => {
  return useQuery(
    ['getUsersByAgeRange', ageRange],
    async () => {
      const { getUsersByAgeRange } = await graphQLClient.request(
        gql`query GET_USERS_BY_AGE_RANGE ($ageRange: String!) { getUsersByAgeRange(ageRange: $ageRange) }`,
        { ageRange }
      )
      return getUsersByAgeRange
    },
    { enabled: !!ageRange }
  )
}

export const useGetContactUsers = () => {
  return useQuery(
    ['getContactUsers'],
    async () => {
      const { getContactUsers } = await graphQLClient.request(
        gql`query GET_CONTACT_USERS { getContactUsers }`
      )
      return getContactUsers
    }
  )
}

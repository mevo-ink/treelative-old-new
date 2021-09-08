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

export const useGetUsersByAges = (ages) => {
  return useQuery(
    ['getUsersByAges', ages],
    async () => {
      const { getUsersByAges } = await graphQLClient.request(
        gql`query GET_USERS_BY_AGES ($ages: String!) { getUsersByAges(ages: $ages) }`,
        { ages }
      )
      return getUsersByAges
    },
    { enabled: !!ages }
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

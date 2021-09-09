import { graphQLClient, gql } from 'graphql/client'

export const getUser = async ({ queryKey }) => {
  const [, variables] = queryKey
  const { getUser } = await graphQLClient.request(
    gql`
      query GET_USER ($id: String!) {
        getUser (id: $id)
      }
    `,
    variables
  )
  return getUser
}

export const getUsersByCountry = async ({ queryKey }) => {
  const [, variables] = queryKey
  const { getUsersByCountry } = await graphQLClient.request(
    gql`
      query GET_USERS_BY_COUNTRY ($country: String!) {
        getUsersByCountry (country: $country)
      }
    `,
    variables
  )
  return getUsersByCountry
}

export const getUsersByAgeRange = async ({ queryKey }) => {
  const [, variables] = queryKey
  const { getUsersByAgeRange } = await graphQLClient.request(
    gql`
      query GET_USERS_BY_AGE_RANGE ($ageRange: String!) {
        getUsersByAgeRange (ageRange: $ageRange)
      }
    `,
    variables
  )
  return getUsersByAgeRange
}

export const getContactUsers = async () => {
  const { getContactUsers } = await graphQLClient.request(
    gql`
      query GET_CONTACT_USERS {
        getContactUsers
      }
    `
  )
  return getContactUsers
}

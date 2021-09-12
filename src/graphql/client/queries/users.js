import { graphQLClient, gql } from 'graphql/client'

export const getUser = async ({ queryKey }) => {
  try {
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
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getUsersByCountry = async ({ queryKey }) => {
  try {
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
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getUsersByAgeRange = async ({ queryKey }) => {
  try {
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
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getContactUsers = async () => {
  try {
    const { getContactUsers } = await graphQLClient.request(
      gql`
        query GET_CONTACT_USERS {
          getContactUsers
        }
      `
    )
    return getContactUsers
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getUnverifiedUsers = async () => {
  try {
    const { getUnverifiedUsers } = await graphQLClient.request(
      gql`
        query GET_UNVERIFIED_USERS {
          getUnverifiedUsers
        }
      `
    )
    return getUnverifiedUsers
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

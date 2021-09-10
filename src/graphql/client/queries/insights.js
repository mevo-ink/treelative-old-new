import { graphQLClient, gql } from 'graphql/client'

export const countUsers = async () => {
  try {
    const { countUsers } = await graphQLClient.request(
      gql`
        query COUNT_USERS {
          countUsers
        }
      `
    )
    return countUsers
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const countCouples = async () => {
  try {
    const { countCouples } = await graphQLClient.request(
      gql`
        query COUNT_COUPLES {
          countCouples
        }
      `
    )
    return countCouples
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getAgeInsights = async () => {
  try {
    const { getAgeInsights } = await graphQLClient.request(
      gql`
        query GET_AGE_INSIGHTS {
          getAgeInsights
        }
      `
    )
    return getAgeInsights
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getCountryInsights = async () => {
  try {
    const { getCountryInsights } = await graphQLClient.request(
      gql`
        query GET_COUNTRY_INSIGHTS {
          getCountryInsights
        }
      `
    )
    return getCountryInsights
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

import { graphQLClient, gql } from 'graphql/client'

export const countUsers = async () => {
  const { countUsers } = await graphQLClient.request(
    gql`
      query COUNT_USERS {
        countUsers
      }
    `
  )
  return countUsers
}

export const countCouples = async () => {
  const { countCouples } = await graphQLClient.request(
    gql`
      query COUNT_COUPLES {
        countCouples
      }
    `
  )
  return countCouples
}

export const getAgeInsights = async () => {
  const { getAgeInsights } = await graphQLClient.request(
    gql`
      query GET_AGE_INSIGHTS {
        getAgeInsights
      }
    `
  )
  return getAgeInsights
}

export const getCountryInsights = async () => {
  const { getCountryInsights } = await graphQLClient.request(
    gql`
      query GET_COUNTRY_INSIGHTS {
        getCountryInsights
      }
    `
  )
  return getCountryInsights
}

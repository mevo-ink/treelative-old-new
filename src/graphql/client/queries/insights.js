import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useCountUsers = () => {
  return useQuery(
    ['countUsers'],
    async () => {
      const { countUsers } = await graphQLClient.request(
        gql`query COUNT_USERS { countUsers }`
      )
      return countUsers
    }
  )
}

export const useCountCouples = () => {
  return useQuery(
    ['countCouples'],
    async () => {
      const { countCouples } = await graphQLClient.request(
        gql`query COUNT_COUPLES { countCouples }`
      )
      return countCouples
    }
  )
}

export const useGetAgeInsights = () => {
  return useQuery(
    ['getAgeInsights'],
    async () => {
      const { getAgeInsights } = await graphQLClient.request(
        gql`query GET_AGE_INSIGHTS { getAgeInsights }`
      )
      return getAgeInsights
    }
  )
}

export const useGetCountryInsights = () => {
  return useQuery(
    ['getCountryInsights'],
    async () => {
      const { getCountryInsights } = await graphQLClient.request(
        gql`query GET_COUNTRY_INSIGHTS { getCountryInsights }`
      )
      return getCountryInsights
    }
  )
}

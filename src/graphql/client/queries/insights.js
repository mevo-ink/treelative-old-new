import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'

export const useCountUsers = () => {
  return useQuery(
    ['countUsers'],
    async () => {
      const { countUsers } = await request(
        '/api/graphql',
        gql`query { countUsers }`
      )
      return countUsers
    }
  )
}

export const useCountCouples = () => {
  return useQuery(
    ['countCouples'],
    async () => {
      const { countCouples } = await request(
        '/api/graphql',
        gql`query { countCouples }`
      )
      return countCouples
    }
  )
}

export const useAgeInsights = () => {
  return useQuery(
    ['getAgeInsights'],
    async () => {
      const { getAgeInsights } = await request(
        '/api/graphql',
        gql`query { getAgeInsights }`
      )
      return getAgeInsights
    }
  )
}

export const useCountryInsights = () => {
  return useQuery(
    ['getCountryInsights'],
    async () => {
      const { getCountryInsights } = await request(
        '/api/graphql',
        gql`query { getCountryInsights }`
      )
      return getCountryInsights
    }
  )
}

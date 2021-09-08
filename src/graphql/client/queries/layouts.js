import { graphQLClient, gql } from 'graphql/client'
import { useQuery } from 'react-query'

export const useGetGraphData = () => {
  return useQuery(
    ['getGraphData'],
    async () => {
      const { getGraphData } = await graphQLClient.request(
        gql`query GET_GRAPH_DATA { getGraphData }`
      )
      return getGraphData
    }
  )
}

export const useGetMapData = () => {
  return useQuery(
    ['getMapData'],
    async () => {
      const { getMapData } = await graphQLClient.request(
        gql`query GET_MAP_DATA { getMapData }`
      )
      return getMapData
    }
  )
}

export const useGetAgeData = () => {
  return useQuery(
    ['getAgeData'],
    async () => {
      const { getAgeData } = await graphQLClient.request(
        gql`query GET_AGE_DATA { getAgeData }`
      )
      return getAgeData
    }
  )
}

export const useGetBirthdayData = () => {
  return useQuery(
    ['getBirthdayData'],
    async () => {
      const { getBirthdayData } = await graphQLClient.request(
        gql`query GET_BIRTHDAY_DATA { getBirthdayData }`
      )
      return getBirthdayData
    }
  )
}

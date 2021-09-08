import { request, gql } from 'graphql-request'
import { useQuery } from 'react-query'

export const useGraphData = () => {
  return useQuery(
    ['getGraphData'],
    async () => {
      const { getGraphData } = await request(
        '/api/graphql',
        gql`query { getGraphData }`
      )
      return getGraphData
    }
  )
}

export const useMapData = () => {
  return useQuery(
    ['getMapData'],
    async () => {
      const { getMapData } = await request(
        '/api/graphql',
        gql`query { getMapData }`
      )
      return getMapData
    }
  )
}

export const useAgeData = () => {
  return useQuery(
    ['getAgeData'],
    async () => {
      const { getAgeData } = await request(
        '/api/graphql',
        gql`query { getAgeData }`
      )
      return getAgeData
    }
  )
}

export const useBirthdayData = () => {
  return useQuery(
    ['getBirthdayData'],
    async () => {
      const { getBirthdayData } = await request(
        '/api/graphql',
        gql`query { getBirthdayData }`
      )
      return getBirthdayData
    }
  )
}

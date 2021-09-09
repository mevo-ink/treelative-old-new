import { graphQLClient, gql } from 'graphql/client'

export const getGraphData = async () => {
  const { getGraphData } = await graphQLClient.request(
    gql`
      query GET_GRAPH_DATA {
        getGraphData
      }
    `
  )
  return getGraphData
}

export const getMapData = async () => {
  const { getMapData } = await graphQLClient.request(
    gql`
      query GET_MAP_DATA {
        getMapData
      }
    `
  )
  return getMapData
}

export const getAgeData = async () => {
  const { getAgeData } = await graphQLClient.request(
    gql`
      query GET_AGE_DATA {
        getAgeData
      }
    `
  )
  return getAgeData
}

export const getBirthdayData = async () => {
  const { getBirthdayData } = await graphQLClient.request(
    gql`
      query GET_BIRTHDAY_DATA {
        getBirthdayData
      }
    `
  )
  return getBirthdayData
}

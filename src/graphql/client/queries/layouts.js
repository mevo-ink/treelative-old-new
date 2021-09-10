import { graphQLClient, gql } from 'graphql/client'

export const getGraphData = async () => {
  try {
    const { getGraphData } = await graphQLClient.request(
      gql`
        query GET_GRAPH_DATA {
          getGraphData
        }
      `
    )
    return getGraphData
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getMapData = async () => {
  try {
    const { getMapData } = await graphQLClient.request(
      gql`
        query GET_MAP_DATA {
          getMapData
        }
      `
    )
    return getMapData
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getAgeData = async () => {
  try {
    const { getAgeData } = await graphQLClient.request(
      gql`
        query GET_AGE_DATA {
          getAgeData
        }
      `
    )
    return getAgeData
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const getBirthdayData = async () => {
  try {
    const { getBirthdayData } = await graphQLClient.request(
      gql`
        query GET_BIRTHDAY_DATA {
          getBirthdayData
        }
      `
    )
    return getBirthdayData
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

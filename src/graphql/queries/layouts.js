import { gql } from 'urql'

export const GET_NETWORK_DATA = gql`
  query GET_NETWORK_DATA {
    getNetworkData
  }
`

export const GET_MAP_DATA = gql`
  query GET_MAP_DATA {
    getMapData
  }
`

export const GET_AGE_DATA = gql`
  query GET_AGE_DATA {
    getAgeData
  }
`

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

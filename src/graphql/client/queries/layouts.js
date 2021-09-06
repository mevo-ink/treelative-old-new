import { gql } from 'urql'

export const GET_NETWORK_DATA = gql`
  query GET_NETWORK_DATA {
    getGraphData
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

export const GET_BIRTHDAY_DATA = gql`
  query GET_BIRTHDAY_DATA {
    getBirthdayData
  }
`

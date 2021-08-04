import { gql } from 'urql'

export const COUNT_MEMBERS = gql`
  query COUNT_MEMBERS {
    countUsers
  }
`

export const COUNT_COUPLES = gql`
  query COUNT_COUPLES {
    countCouples
  }
`

export const INSIGHTS_BY_AGE = gql`
  query INSIGHTS_BY_AGE {
    insightsByAge
  }
`

export const INSIGHTS_BY_LOCATION = gql`
  query INSIGHTS_BY_LOCATION {
    insightsByLocation
  }
`

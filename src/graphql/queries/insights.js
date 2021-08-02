import { gql } from 'urql'

export const GET_MEMBERS = gql`
  query MEMBERS {
    countUsers
  }
`

export const GET_COUPLES = gql`
  query COUPLES {
    countCouples
  }
`

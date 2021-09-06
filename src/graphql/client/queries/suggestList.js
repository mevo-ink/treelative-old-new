import { gql } from 'urql'

export const SUGGEST_LOCATIONS = gql`
  query SUGGEST_LOCATIONS ($search: String) {
    locations: suggestLocations(query: $search)
  }
`

export const SUGGEST_PARTNERS = gql`
  query SUGGEST_PARTNERS ($userID: String! $search: String!) {
    users: suggestPartners(userID: $userID, query: $search) {
      id
      fullName
    }
  }
`

export const SUGGEST_PARENTS = gql`
  query SUGGEST_PARENTS ($userID: String! $search: String!) {
    users: suggestParents(userID: $userID, query: $search) {
      id
      fullName
    }
  }
`

export const SUGGEST_CHILDREN = gql`
  query SUGGEST_CHILDREN ($userID: String! $search: String!) {
    users: suggestChildren(userID: $userID, query: $search) {
      id
      fullName
    }
  }
`

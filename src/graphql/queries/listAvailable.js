import { gql } from 'urql'

export const LIST_AVAILABLE_LOCATIONS = gql`
  query LIST_AVAILABLE_LOCATIONS ($search: String) {
    locations: suggestLocations(query: $search)
  }
`

export const LIST_AVAILABLE_PARTNERS = gql`
  query LIST_AVAILABLE_PARTNERS ($userID: String! $search: String!) {
    users: suggestPartners(userID: $userID, query: $search) {
      id
      fullName
    }
  }
`

export const LIST_AVAILABLE_PARENTS = gql`
  query LIST_AVAILABLE_PARENTS ($userID: String! $search: String!) {
    users: suggestParents(userID: $userID, query: $search) {
      id
      fullName
    }
  }
`

export const LIST_AVAILABLE_CHILDREN = gql`
  query LIST_AVAILABLE_CHILDREN ($userID: String! $search: String!) {
    users: suggestChildren(userID: $userID, query: $search) {
      id
      fullName
    }
  }
`

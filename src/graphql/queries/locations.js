import { gql } from 'urql'

export const LIST_SUGGEST_LOCATIONS = gql`
  query LIST_SUGGEST_LOCATIONS ($search: String) {
    locations: suggestLocations(query: $search)
  }
`

import { gql } from 'urql'

export const LIST_LOCATION_SUGGESTIONS = gql`
  query LIST_LOCATION_SUGGESTIONS ($search: String) {
    locations: getLocationSuggestions (search: $search)
  }
`

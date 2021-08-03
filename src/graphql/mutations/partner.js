import { gql } from 'urql'

export const ADD_PARTNER = gql`
  mutation ADD_PARTNER ($userID: String! $partnerID: String!) {
    addUserPartner(userID: $userID partnerID: $partnerID){
      id
      partner {
        id
      }
    }
  }
`

export const REMOVE_PARTNER = gql`
  mutation REMOVE_PARTNER ($userID: String! $partnerID: String!) {
    removeUserPartner(userID: $userID partnerID: $partnerID){
      id
      partner {
        id
      }
    }
  }
`

export const UPDATE_DATE_OF_MARRIAGE = gql`
  mutation UPDATE_DATE_OF_MARRIAGE ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      dateOfMarriage
    }
  }
`

export const UPDATE_MARRIAGE_LOCATION = gql`
  mutation UPDATE_MARRIAGE_LOCATION ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      marriageLocation
    }
  }
`

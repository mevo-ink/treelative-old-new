import { gql } from 'urql'

export const ADD_CHILD = gql`
  mutation ADD_CHILD ($userID: String! $childID: String!) {
    addUserChild(userID: $userID childID: $childID){
      id
      children {
        id
      }
    }
  }
`

export const REMOVE_CHILD = gql`
  mutation REMOVE_CHILD ($userID: String! $childID: String!) {
    removeUserChild(userID: $userID childID: $childID){
      id
      children {
        id
      }
    }
  }
`

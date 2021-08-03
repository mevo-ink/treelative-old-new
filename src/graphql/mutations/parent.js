import { gql } from 'urql'

export const ADD_PARENT = gql`
  mutation ADD_PARENT ($userID: String! $parentID: String!) {
    addUserParent(userID: $userID parentID: $parentID){
      id
      parents {
        id
      }
    }
  }
`

export const REMOVE_PARENT = gql`
  mutation REMOVE_PARENT ($userID: String! $parentID: String!) {
    removeUserParent(userID: $userID parentID: $parentID){
      id
      parents {
        id
      }
    }
  }
`

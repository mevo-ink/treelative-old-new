import { gql } from 'urql'

export const ADD_USER = gql`
  mutation ADD_USER ($input: AddUserInput!) {
    addUser(input: $input) {
      id
    }
  }
`

export const UPDATE_USER_AVATAR = gql`
  mutation UPDATE_USER_AVATAR ($userID: String!) {
    updateUserAvatar(userID: $userID)
  }
`

export const UPDATE_USER_USERNAME = gql`
  mutation UPDATE_USER_USERNAME ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      username
    }
  }
`

export const UPDATE_USER_SHORT_NAME = gql`
  mutation UPDATE_USER_SHORT_NAME ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      shortName
    }
  }
`

export const UPDATE_FULL_NAME = gql`
  mutation UPDATE_FULL_NAME ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      fullName
    }
  }
`

export const UPDATE_USER_EMAIL = gql`
  mutation UPDATE_USER_EMAIL ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      email
    }
  }
`

export const UPDATE_USER_PHONE_NUMBER = gql`
  mutation UPDATE_USER_PHONE_NUMBER ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      phoneNumber
    }
  }
`

export const UPDATE_DATE_OF_BIRTH = gql`
  mutation UPDATE_DATE_OF_BIRTH ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      dateOfBirth
    }
  }
`

export const UPDATE_DATE_OF_DEATH = gql`
  mutation UPDATE_DATE_OF_DEATH ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      dateOfDeath
    }
  }
`

export const UPDATE_BIRTH_LOCATION = gql`
  mutation UPDATE_BIRTH_LOCATION ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      birthLocation
    }
  }
`

export const UPDATE_CURRENT_LOCATION = gql`
  mutation UPDATE_CURRENT_LOCATION ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      currentLocation
    }
  }
`

export const ADD_USER_PARENT = gql`
  mutation ADD_USER_PARENT ($userID: String! $parentID: String!) {
    addUserParent(userID: $userID parentID: $parentID){
      id
      parents {
        id
      }
    }
  }
`

export const DELETE_USER_PARENT = gql`
  mutation DELETE_USER_PARENT ($userID: String! $parentID: String!) {
    deleteUserParent(userID: $userID parentID: $parentID){
      id
      parents {
        id
      }
    }
  }
`

export const ADD_USER_CHILD = gql`
  mutation ADD_USER_CHILD ($userID: String! $childID: String!) {
    addUserChild(userID: $userID childID: $childID){
      id
      children {
        id
      }
    }
  }
`

export const DELETE_USER_CHILD = gql`
  mutation DELETE_USER_CHILD ($userID: String! $childID: String!) {
    deleteUserChild(userID: $userID childID: $childID){
      id
      children {
        id
      }
    }
  }
`

export const RESET_USER_PASSWORD = gql`
  mutation RESET_USER_PASSWORD ($userID: String! $password: String!) {
    resetUserPassword(userID: $userID password: $password){
      id
    }
  }
`

export const UPDATE_USER_SETTINGS = gql`
  mutation UPDATE_USER_SETTINGS ($userID: String! $input: UpdateUserInput!) {
    updateUser(userID: $userID input: $input) {
      id
      settings
    }
  }
`

export const DELETE_USER = gql`
  mutation DELETE_USER ($userID: String!) {
    deleteUser(userID: $userID){
      id
    }
  }
`

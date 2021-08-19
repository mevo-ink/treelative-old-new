import { gql } from 'urql'

export const CREATE_USER = gql`
  mutation CREATE_USER ($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`

export const UPDATE_AVATAR = gql`
  mutation UPDATE_AVATAR ($userID: String!) {
    updateUserAvatar(userID: $userID)
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

export const UPDATE_DATE_OF_BIRTH = gql`
  mutation UPDATE_DATE_OF_BIRTH ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      dateOfBirth
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

export const UPDATE_DATE_OF_DEATH = gql`
  mutation UPDATE_DATE_OF_DEATH ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      dateOfDeath
    }
  }
`

export const UPDATE_SHORT_NAME = gql`
  mutation UPDATE_SHORT_NAME ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      shortName
    }
  }
`

export const TOGGLE_PUBLIC = gql`
  mutation TOGGLE_PUBLIC ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      isPublic
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

export const DELETE_USER = gql`
  mutation DELETE_USER ($userID: String!) {
    deleteUser(userID: $userID){
      id
    }
  }
`

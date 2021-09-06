import { gql } from 'urql'

export const UPDATE_EMAIL = gql`
  mutation UPDATE_EMAIL ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      email
    }
  }
`

export const UPDATE_PHONE_NUMBER = gql`
  mutation UPDATE_PHONE_NUMBER ($userID: String! $input: UpdateUserGeneralInput!) {
    updateUserGeneral(userID: $userID input: $input) {
      id
      phoneNumber
    }
  }
`

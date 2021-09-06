import { gql } from 'urql'

export const LOGIN_WITH_PROVIDER = gql`
  mutation LOGIN_WITH_PROVIDER ($email: String! $token: String!) {
    login: loginWithProvider (email: $email token: $token)
  }
`

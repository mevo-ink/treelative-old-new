import { gql } from 'urql'

export const UPDATE_SOCIAL = gql`
  mutation UPDATE_SOCIAL ($userID: String!, $input: UpdateUserSocialInput!) {
  updateUserSocial (userID: $userID, input: $input) {
    social {
      facebook
      twitter
      instagram
      linkedIn
      website
    }
  }
}
`

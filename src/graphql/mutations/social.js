import { gql } from 'urql'

export const UPDATE_SOCIAL = gql`
  mutation UPDATE_SOCIAL ($userID: String!, $input: UpdateUserSocialInput!) {
  updateUserSocial (userID: $userID, input: $input) {
    id
    social {
      facebook
      twitter
      instagram
      linkedin
      website
    }
  }
}
`

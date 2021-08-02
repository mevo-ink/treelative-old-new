import { gql } from 'urql'

export const ADD_SOCIAL = gql`
  mutation ADD_SOCIAL ($input: AddSocialLinkInput!) {
    addSocialLink(input: $input) {
      id
      user {
        id
        socialLinks {
          id
          type
          url
        }
      }
    }
  }
`

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

export const DELETE_SOCIAL = gql`
  mutation DELETE_SOCIAL_LINK ($socialLinkID: String!) {
    deleteSocialLink(socialLinkID: $socialLinkID){
      id
    }
  }
`

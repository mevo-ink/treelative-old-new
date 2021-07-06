import { gql } from 'urql'

export const ADD_SOCIAL_LINK = gql`
  mutation ADD_SOCIAL_LINK ($input: AddSocialLinkInput!) {
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

export const UPDATE_SOCIAL_LINK_TYPE = gql`
  mutation UPDATE_SOCIAL_LINK_TYPE ($socialLinkID: String! $input: UpdateSocialLinkInput!) {
    updateSocialLink(socialLinkID: $socialLinkID input: $input) {
      id
      type
    }
  }
`

export const UPDATE_SOCIAL_LINK_URL = gql`
  mutation UPDATE_SOCIAL_LINK_URL ($socialLinkID: String! $input: UpdateSocialLinkInput!) {
    updateSocialLink(socialLinkID: $socialLinkID input: $input) {
      id
      url
    }
  }
`

export const DELETE_SOCIAL_LINK = gql`
  mutation DELETE_SOCIAL_LINK ($socialLinkID: String!) {
    deleteSocialLink(socialLinkID: $socialLinkID){
      id
    }
  }
`

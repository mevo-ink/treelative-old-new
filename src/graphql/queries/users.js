import { gql } from 'urql'

export const GET_USER = gql`
  query GET_USER ($id: String!) {
    getUser (id: $id) {
      id
      isAdmin
      username
      avatar
      fullName
      shortName
      dateOfBirth
      dateOfDeath
      dateOfMarriage
      birthLocation
      currentLocation
      marriageLocation
      email
      phoneNumber
      social {
        facebook
        twitter
        instagram
        linkedin
        website
      }
      parents {
        id
        fullName
        avatar
        shortName
      }
      children {
        id
        fullName
        avatar
        shortName
      }
      partner {
        id
        fullName
        avatar
        shortName
      }
    }
  }
`

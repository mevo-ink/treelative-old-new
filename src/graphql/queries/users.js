import { gql } from 'urql'

export const GET_USER = gql`
  query GET_USER ($id: String!) {
    getUser (id: $id) {
      id
      isAdmin
      isPublic
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

export const SEARCH_USERS = gql`
  query SEARCH_USERS ($query: String!) {
    users: searchUsers (query: $query) {
      id
      avatar
      fullName
      dateOfBirth
      currentLocation
    }
  }
`

export const GET_CONTACT_USERS = gql`
  query GET_CONTACT_USERS {
    getContactUsers {
      id
      fullName
      avatar
      shortName
    }
  }
`

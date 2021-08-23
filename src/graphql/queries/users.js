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

export const GET_USERS_BY_COUNTRY = gql`
  query GET_USERS_BY_COUNTRY ($country: String!) {
    users: getUsersByCountry (country: $country) {
      id
      fullName
      avatar
    }
  }
`

export const GET_USERS_BY_AGES = gql`
  query GET_USERS_BY_AGES ($ages: String!) {
    users: getUsersByAges (ages: $ages) {
      id
      fullName
      avatar
    }
  }
`

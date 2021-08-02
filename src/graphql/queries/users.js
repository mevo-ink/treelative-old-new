import { gql } from 'urql'

export const QUERY_USER = gql`
  query QUERY_USER ($where: UserFilter $orderBy: [UserOrder!] $take: Int $skip: Int) {
    allData: queryUser (where: $where orderBy: $orderBy take: $take skip: $skip) {
      id
      shortName
      fullName
      dateOfBirth
      parents {
        id
        fullName
        avatar
      }
      children {
        id
        fullName
        avatar
      }
      couple {
        id
        dateOfMarriage
        marriageLocation
        partner {
          id
          fullName
          avatar
        }
      }
      family {
        id
        fullName
        avatar
      }
    }
    filteredCount: countUser (where: $where)
    allCount: countUser
  }
`

export const GET_USER_FAMILY = gql`
  query GET_USER_FAMILY ($userID: String!) {
    allData: getUserFamily (userID: $userID) {
      id
      shortName
      fullName
      dateOfBirth
      parents {
        id
        fullName
        avatar
      }
      children {
        id
        fullName
        avatar
      }
      couple {
        id
        dateOfMarriage
        marriageLocation
        partner {
          id
          fullName
          avatar
        }
      }
    }
  }
`

export const LIST_USERS = gql`
  query LIST_USERS ($search: String!) {
    users: queryUser (where: { fullName: { contains: $search mode: "insensitive" } } orderBy: { fullName: asc } take: 5) {
      id
      fullName
    }
  }
`

export const LIST_USER_AVAILABLE_PARTNERS = gql`
  query LIST_USER_AVAILABLE_PARTNERS ($userID: String! $search: String!) {
    users: getUserAvailablePartners (userID: $userID where: { fullName: { contains: $search mode: "insensitive" } } orderBy: { fullName: asc } take: 5) {
      id
      fullName
    }
  }
`

export const LIST_AVAILABLE_PARENTS = gql`
  query LIST_AVAILABLE_PARENTS ($userID: String! $query: String!) {
    users: suggestParents(userID: $userID, query: $query) {
      id
      fullName
    }
  }
`

export const LIST_USER_AVAILABLE_CHILDREN = gql`
  query LIST_USER_AVAILABLE_CHILDREN ($userID: String! $search: String!) {
    users: getUserAvailableChildren (userID: $userID where: { fullName: { contains: $search mode: "insensitive" } } orderBy: { fullName: asc } take: 5) {
      id
      fullName
    }
  }
`

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
        linkedIn
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

export const GET_USER_GENERAL = gql`
  query GET_USER_GENERAL ($filter: UserUniqueFilter!) {
    getUser (filter: $filter) {
      id
      username
      avatar
      email
      phoneNumber
      fullName
      shortName
      dateOfBirth
      dateOfDeath
      birthLocation
      currentLocation
    }
  }
`

export const GET_AUTH_USER = gql`
  query GET_AUTH_USER ($id: String!) {
    getUser (id: $id) {
      id
      fullName
      dateOfBirth
      avatar
    }
  }
`

export const GET_USER_SOCIAL = gql`
  query GET_USER_SOCIAL ($filter: UserUniqueFilter!) {
    getUser (filter: $filter) {
      id
      socialLinks {
        id
        type
        url
      }
    }
  }
`
export const GET_USER_SETTINGS = gql`
  query GET_USER_SETTINGS ($filter: UserUniqueFilter!) {
    getUser (filter: $filter) {
      id
      settings
    }
  }
`
export const SEARCH_USERS = gql`
  query SEARCH_USERS ($search: String!) {
    users: queryUser (
      where: {
        OR: [
          { username: { contains: $search, mode: "insensitive" } }
          { fullName: { contains: $search, mode: "insensitive" } }
          { shortName: { contains: $search, mode: "insensitive" } }
          { email: { contains: $search, mode: "insensitive" } }
          { phoneNumber: { contains: $search, mode: "insensitive" } }
          { currentLocation: { path: ["suggested", "description"], string_contains: $search } }
          { birthLocation: { path: ["suggested", "description"], string_contains: $search } }
          { deathLocation: { path: ["suggested", "description"], string_contains: $search } }
        ]
      }
      orderBy: { fullName: asc }
      take: 5
    ) {
      id
      avatar
      fullName
      dateOfBirth
      currentLocation
    }
  }
`

import { gql } from 'apollo-server-micro'

export default gql`
  scalar JSON
  scalar DateTime

  type User {
    id: String
    isAdmin: Boolean
    isPublic: Boolean
    username: String!
    fullName: String!
    shortName: String!
    email: String
    phoneNumber: String
    avatar: String
    birthLocation: JSON
    currentLocation: JSON
    marriageLocation: JSON
    dateOfBirth: DateTime
    dateOfMarriage: DateTime
    dateOfDeath: DateTime
    social: Social
    partner: User
    parents: [User!]
    children: [User!]
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Social {
    facebook: String
    twitter: String
    instagram: String
    linkedin: String
    website: String
  }
`

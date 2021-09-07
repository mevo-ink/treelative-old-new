import { gql } from 'apollo-server-micro'

export default gql`
  scalar JSON
  scalar DateTime

  type User {
    id: String
    isAdmin: Boolean
    isPublic: Boolean
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
    social: JSON
    partner: User
    parents: [User!]
    children: [User!]
    createdAt: DateTime
    updatedAt: DateTime
  }
`

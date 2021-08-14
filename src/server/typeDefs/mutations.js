import { gql } from 'apollo-server-micro'

export default gql`
  type Mutation {
    login (input: LoginInput!): String!
    loginWithProvider (email: String! token: String!): String!
    resetUserPassword (userID: String! password: String!): Boolean!

    createUser (input: CreateUserInput!): User!
    deleteUser (userID: String!): Boolean!

    updateUserGeneral (userID: String! input: UpdateUserGeneralInput!): User!
    updateUserSocial (userID: String! input: UpdateUserSocialInput!): User!
    updateUserAvatar (userID: String!): String!

    addUserParent (userID: String! parentID: String!): User!
    addUserChild (userID: String! childID: String!): User!
    addUserPartner(userID: String! partnerID: String!): User!

    removeUserParent (userID: String! parentID: String!): User!
    removeUserChild (userID: String! childID: String!): User!
    removeUserPartner(userID: String! partnerID: String!): User!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input CreateUserInput {
    fullName: String!
    shortName: String!
  }

  input UpdateUserGeneralInput {
    username: String
    email: String
    phoneNumber: String
    fullName: String
    shortName: String
    birthLocation: JSON
    currentLocation: JSON
    marriageLocation: JSON
    dateOfBirth: DateTime
    dateOfMarriage: DateTime
    dateOfDeath: DateTime
    isPublic: Boolean
  }

  input UpdateUserSocialInput {
    facebook: String
    twitter: String
    instagram: String
    linkedin: String
    website: String
  }
`

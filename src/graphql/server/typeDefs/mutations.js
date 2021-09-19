import { gql } from 'apollo-server-micro'

export default gql`
  type Mutation {
    loginWithEmail (email: String! token: String!): String!
    loginWithPhoneNumber (phoneNumber: String! token: String!): String!
    connectUserEmail (userID: String! email: String! token: String!): JSON!
    connectUserPhoneNumber (userID: String! phoneNumber: String! token: String!): JSON!
    verifyUser (userID: String! isVerified: Boolean!): JSON!

    createUser (input: CreateUserInput! token: String): String!
    deleteUser (userID: String!): Boolean!

    updateUserGeneral (userID: String! input: UpdateUserGeneralInput!): JSON!
    updateUserSocial (userID: String! input: UpdateUserSocialInput!): JSON!
    updateUserAvatar (userID: String!): JSON!

    addUserParent (userID: String! parentID: String!): JSON!
    addUserChild (userID: String! childID: String!): JSON!
    addUserPartner(userID: String! partnerID: String!): JSON!

    removeUserParent (userID: String! parentID: String!): JSON!
    removeUserChild (userID: String! childID: String!): JSON!
    removeUserPartner(userID: String! partnerID: String!): JSON!

    scriptAvatars: Boolean
    scriptMigrate: Boolean

    sendFCMToken (token: String! fingerprint: String! browser: String): JSON!
    sendNotification (title: String! description: JSON!): JSON!
  }

  input CreateUserInput {
    fullName: String!
    shortName: String!
  }

  input UpdateUserGeneralInput {
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

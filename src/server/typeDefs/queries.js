import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    healthCheck: String!

    # auth
    whoAmI: User!

    # profile card
    getUser (id: String!): User

    # search
    searchUsers (query: String!): [User!]

    # layouts
    getNetworkData: JSON!
    getMapData: JSON!
    getAgeData: JSON!
    getBirthdayData: JSON!

    # insights
    countUsers: Int!
    countCouples: Int!
    insightsByAge: JSON!
    insightsByLocation: JSON!

    # dropdown suggestions
    suggestParents (userID: String! query: String): [User!]
    suggestChildren (userID: String! query: String): [User!]
    suggestPartners (userID: String! query: String): [User!]
    suggestLocations (query: String): JSON!

    suggestNewUsers (query: String!): [User!]
  }
`

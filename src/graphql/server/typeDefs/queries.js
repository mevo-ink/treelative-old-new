import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    healthCheck: String!

    # auth
    whoAmI: JSON!

    # profile card
    getUser (id: String!): JSON

    # search
    searchUsers (query: String!): JSON!

    # layouts
    getGraphData: JSON!
    getMapData: JSON!
    getAgeData: JSON!
    getBirthdayData: JSON!

    # insights
    countUsers: Int!
    countCouples: Int!
    insightsByAge: JSON!
    insightsByLocation: JSON!

    # dropdown suggestions
    suggestParents (userID: String! query: String): JSON!
    suggestChildren (userID: String! query: String): JSON!
    suggestPartners (userID: String! query: String): JSON!
    suggestNewUsers (query: String): JSON!
    suggestLocations (query: String): JSON!

    # insights tooltip
    getUsersByAges (ages: String!): JSON!
    getUsersByCountry (country: String!): JSON!

    getContactUsers: JSON!
  }
`

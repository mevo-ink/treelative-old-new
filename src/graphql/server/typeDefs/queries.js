import { gql } from 'apollo-server-micro'

export default gql`
  type Query {
    healthCheck: String!

    # auth
    whoAmI: JSON!

    # profile card
    getUser (id: String!): JSON

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

    # search
    searchUsers (query: String!): JSON!
    searchParents (userID: String! query: String): JSON!
    searchChildren (userID: String! query: String): JSON!
    searchPartners (userID: String! query: String): JSON!
    searchNewUsers (query: String): JSON!
    searchLocations (query: String): JSON!

    # insights tooltip
    getUsersByAges (ages: String!): JSON!
    getUsersByCountry (country: String!): JSON!

    getContactUsers: JSON!
  }
`

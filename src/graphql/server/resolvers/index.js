import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import loginWithProvider from './mutations/auth/loginWithProvider'
import connectUserEmail from './mutations/auth/connectUserEmail'

import whoAmI from './queries/auth/whoAmI'

import createUser from './mutations/users/createUser'
import deleteUser from './mutations/users/deleteUser'

import updateUserGeneral from './mutations/users/updateUserGeneral'
import updateUserSocial from './mutations/users/updateUserSocial'
import updateUserAvatar from './mutations/users/updateUserAvatar'

import addUserParent from './mutations/relations/addUserParent'
import addUserChild from './mutations/relations/addUserChild'
import addUserPartner from './mutations/relations/addUserPartner'

import removeUserParent from './mutations/relations/removeUserParent'
import removeUserChild from './mutations/relations/removeUserChild'
import removeUserPartner from './mutations/relations/removeUserPartner'

import getUser from './queries/users/getUser'
import getContactUsers from './queries/users/getContactUsers'

import countUsers from './queries/insights/countUsers'
import countCouples from './queries/insights/countCouples'
import getAgeInsights from './queries/insights/getAgeInsights'
import getCountryInsights from './queries/insights/getCountryInsights'
import getUsersByAges from './queries/insights/getUsersByAges'
import getUsersByCountry from './queries/insights/getUsersByCountry'

import searchUsers from './queries/search/searchUsers'
import searchUserParents from './queries/search/searchUserParents'
import searchUserChildren from './queries/search/searchUserChildren'
import searchUserPartners from './queries/search/searchUserPartners'
import searchLocations from './queries/search/searchLocations'
import searchNewUsers from './queries/search/searchNewUsers'

import getGraphData from './queries/layouts/getGraphData'
import getMapData from './queries/layouts/getMapData'
import getAgeData from './queries/layouts/getAgeData'
import getBirthdayData from './queries/layouts/getBirthdayData'

// admin only scripts
import avatars from './mutations/scripts/avatars'
import migrate from './mutations/scripts/migrate'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  Query: {
    healthCheck: () => 'Welcome to Treelative API',
    whoAmI,
    getUser,
    countUsers,
    countCouples,
    searchUsers,
    searchNewUsers,
    searchUserParents,
    searchUserChildren,
    searchUserPartners,
    searchLocations,
    getGraphData,
    getMapData,
    getAgeData,
    getBirthdayData,
    getAgeInsights,
    getCountryInsights,
    getUsersByAges,
    getUsersByCountry,
    getContactUsers
  },

  Mutation: {
    loginWithProvider,
    connectUserEmail,
    createUser,
    deleteUser,
    updateUserGeneral,
    updateUserSocial,
    updateUserAvatar,
    addUserParent,
    addUserChild,
    addUserPartner,
    removeUserParent,
    removeUserChild,
    removeUserPartner,
    scriptAvatars: avatars,
    scriptMigrate: migrate
  }
}

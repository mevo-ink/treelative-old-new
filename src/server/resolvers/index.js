import { JSONResolver, DateTimeResolver } from 'graphql-scalars'

import login from './mutations/auth/login'
import loginWithProvider from './mutations/auth/loginWithProvider'
import resetUserPassword from './mutations/auth/resetUserPassword'

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
import getUserAvatar from './queries/users/getUserAvatar'
import getUserPartner from './queries/users/getUserPartner'
import getUserParents from './queries/users/getUserParents'
import getUserChildren from './queries/users/getUserChildren'

import searchUsers from './queries/users/searchUsers'

import countUsers from './queries/insights/countUsers'
import countCouples from './queries/insights/countCouples'
import insightsByAge from './queries/insights/insightsByAge'
import insightsByLocation from './queries/insights/insightsByLocation'

import suggestParents from './queries/suggestions/suggestParents'
import suggestChildren from './queries/suggestions/suggestChildren'
import suggestPartners from './queries/suggestions/suggestPartners'
import suggestLocations from './queries/suggestions/suggestLocations'

import getNetworkData from './queries/layouts/getNetworkData'
import getMapData from './queries/layouts/getMapData'
import getAgeData from './queries/layouts/getAgeData'
import getBirthdayData from './queries/layouts/getBirthdayData'

// admin only scripts
import avatars from './mutations/scripts/avatars'

export default {
  JSON: JSONResolver,
  DateTime: DateTimeResolver,

  User: {
    avatar: getUserAvatar,
    partner: getUserPartner,
    parents: getUserParents,
    children: getUserChildren
  },

  Query: {
    healthCheck: () => 'Welcome to Treelative API',
    whoAmI,
    getUser,
    searchUsers,
    countUsers,
    countCouples,
    suggestParents,
    suggestChildren,
    suggestPartners,
    suggestLocations,
    getNetworkData,
    getMapData,
    getAgeData,
    getBirthdayData,
    insightsByAge,
    insightsByLocation
  },

  Mutation: {
    login,
    loginWithProvider,
    resetUserPassword,
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
    scriptAvatars: avatars
  }
}

import { graphQLClient, gql } from 'graphql/client'

export const addUserParent = async (variables) => {
  const { addUserParent } = await graphQLClient.request(
    gql`
      mutation ADD_USER_PARENT ($userID: String! $parentID: String!) {
        addUserParent (userID: $userID parentID: $parentID)
      }
    `,
    variables
  )
  return addUserParent
}

export const addUserChild = async (variables) => {
  const { addUserChild } = await graphQLClient.request(
    gql`
      mutation ADD_USER_CHILD ($userID: String! $childID: String!) {
        addUserChild (userID: $userID childID: $childID)
      }
    `,
    variables
  )
  return addUserChild
}

export const addUserPartner = async (variables) => {
  try {
    const { addUserPartner } = await graphQLClient.request(
      gql`
        mutation ADD_USER_PARTNER ($userID: String! $partnerID: String!) {
          addUserPartner (userID: $userID partnerID: $partnerID)
        }
      `,
      variables
    )
    return addUserPartner
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const removeUserParent = async (variables) => {
  try {
    const { removeUserParent } = await graphQLClient.request(
      gql`
        mutation REMOVE_USER_PARENT ($userID: String! $parentID: String!) {
          removeUserParent (userID: $userID parentID: $parentID)
        }
      `,
      variables
    )
    return removeUserParent
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

export const removeUserChild = async (variables) => {
  const { removeUserChild } = await graphQLClient.request(
    gql`
      mutation REMOVE_USER_CHILD ($userID: String! $childID: String!) {
        removeUserChild (userID: $userID childID: $childID)
      }
    `,
    variables
  )
  return removeUserChild
}

export const removeUserPartner = async (variables) => {
  try {
    const { removeUserPartner } = await graphQLClient.request(
      gql`
        mutation REMOVE_USER_PARTNER ($userID: String! $partnerID: String!) {
          removeUserPartner (userID: $userID partnerID: $partnerID)
        }
      `,
      variables
    )
    return removeUserPartner
  } catch (error) {
    const [message] = error.message.split(': ')
    throw Error(message)
  }
}

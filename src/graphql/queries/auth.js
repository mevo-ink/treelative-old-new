import { gql } from 'urql'

export const WHO_AM_I = gql`
  query WHO_AM_I {
    whoAmI {
      id
      isAdmin
      avatar
      fullName
      dateOfBirth
      currentLocation
    }
  }
`

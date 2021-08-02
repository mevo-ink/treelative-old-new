import { gql } from 'urql'

export const WHO_AM_I = gql`
  query WHO_AM_I {
    whoAmI {
      id
      isAdmin
      avatar
      fullName
    }
  }
`

export const VIEW_MY_PROFILE = gql`
  query VIEW_MY_PROFILE {
    whoAmI {
      id
      shortName
      fullName
      dateOfBirth
      parents {
        id
        fullName
      }
      children {
        id
        fullName
      }
      couple {
        id
        dateOfMarriage
        marriageLocation
        partner {
          id
          fullName
        }
      }
    }
  }
`

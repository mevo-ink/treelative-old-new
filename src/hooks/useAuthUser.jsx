import { useClient } from 'urql'

import { WHO_AM_I } from 'graphql/queries/auth'

export default function useAuthUser () {
  const client = useClient()

  // fetch the cached authUser
  const { data: { whoAmI } = {} } = client.readQuery(WHO_AM_I) || {}

  return whoAmI || {}
}

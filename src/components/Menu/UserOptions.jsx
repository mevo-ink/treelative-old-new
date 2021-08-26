import { useQuery } from 'urql'

import { WHO_AM_I } from 'graphql/queries/auth'

import FindMe from 'components/Menu/UserOptions/FindMe'
import Profile from 'components/Menu/UserOptions/Profile'
import CreateUser from 'components/Menu/UserOptions/CreateUser'

export default function UserOptions ({ onClose }) {
  const [result] = useQuery({ query: WHO_AM_I })
  return (
    <>
      {result.data?.whoAmI.isAdmin && <CreateUser />}
      <Profile onClose={onClose} authUser={result.data?.whoAmI} />
      {result.data?.whoAmI && <FindMe onClose={onClose} user={result.data?.whoAmI} size='sm' />}
    </>
  )
}

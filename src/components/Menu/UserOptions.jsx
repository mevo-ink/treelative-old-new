import { useQuery } from 'react-query'
import { whoAmI } from 'graphql/client/queries/auth'

import FindMe from 'components/Menu/UserOptions/FindMe'
import Profile from 'components/Menu/UserOptions/Profile'
import CreateUser from 'components/Menu/UserOptions/CreateUser'

export default function UserOptions ({ onClose }) {
  const { data: authUser } = useQuery('whoAmI', whoAmI)

  return (
    <>
      {authUser?.isAdmin && <CreateUser />}
      <Profile onClose={onClose} authUser={authUser} />
      {authUser && <FindMe onClose={onClose} user={authUser} size='sm' />}
    </>
  )
}

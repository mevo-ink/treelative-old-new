import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Menu from 'components/Menu'
import Layouts from 'components/Layouts'
import ProfileCard from 'components/ProfileCard'
// import ProfileCardChumma from 'components/ProfileCardChumma'

export default function App () {
  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  return (
    <>
      {activeNodeID && <ProfileCard />}
      <Menu />
      <Layouts />
    </>
  )
}

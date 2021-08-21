import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Menu from 'components/Menu'
import ProfileCard from 'components/ProfileCard'

export default function Floating () {
  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  return (
    <>
      {activeNodeID && <ProfileCard />}
      <Menu />
    </>
  )
}

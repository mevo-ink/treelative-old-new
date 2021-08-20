import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Menu from 'components/Menu'
import Layouts from 'components/Layouts'
import ProfileCard from 'components/ProfileCard'

import useServiceWorker from 'hooks/useServiceWorker'

export default function Home () {
  useServiceWorker()

  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  return (
    <main>
      {activeNodeID && <ProfileCard />}
      <Menu />
      <Layouts />
    </main>
  )
}

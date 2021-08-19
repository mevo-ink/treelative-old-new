import { useEffect } from 'react'

import ProfileCard from 'components/ProfileCard'

import { useRecoilState } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Loading from 'components/_common/Loading'

export default function Profile () {
  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)

  useEffect(() => {
    // set activeNodeID in recoil state
    setActiveNodeID(window.location.pathname.slice(1))
  }, [])

  return activeNodeID ? <ProfileCard isServerRendered /> : <Loading />
}

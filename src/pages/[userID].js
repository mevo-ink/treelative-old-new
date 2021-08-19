import { useEffect } from 'react'

import { useRouter } from 'next/router'

import ProfileCard from 'components/ProfileCard'

import { useRecoilState } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Loading from 'components/_common/Loading'

export default function Profile () {
  const router = useRouter()

  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)

  useEffect(() => {
    // set activeNodeID in recoil state
    setActiveNodeID(router.query.userID)
  }, [])

  return activeNodeID ? <ProfileCard /> : <Loading />
}

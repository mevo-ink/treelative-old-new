import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Menu from 'components/Menu'
import Layouts from 'components/Layouts'
import ProfileCard from 'components/ProfileCard'

import useServiceWorker from 'hooks/useServiceWorker'

export default function Home () {
  useServiceWorker()

  const router = useRouter()

  useEffect(() => {
    if (window.localStorage.getItem('AUTH_SESSION_ID')) {
      const referrer = window.localStorage.getItem('REDIRECT_REFERRER')
      router.push(referrer || '/layouts/graph')
    } else { router.push('/auth/login') }
  }, [])

  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  return (
    <main>
      {activeNodeID && <ProfileCard />}
      <Menu />
      <Layouts />
    </main>
  )
}

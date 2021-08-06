import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Menu from 'components/Menu'
import Layouts from 'components/Layouts'
import ProfileCard from 'components/ProfileCard'

import useServiceWorker from 'hooks/useServiceWorker'

export default function App () {
  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  useEffect(() => {
    // add event listener on resize to handle mobile navbar issue
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
    const resize = window.addEventListener('resize', () => {
      document.querySelector(':root').style.setProperty('--vh', window.innerHeight / 100 + 'px')
    })
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  useServiceWorker()

  return (
    <>
      {activeNodeID && <ProfileCard />}
      <Menu />
      <Layouts />
    </>
  )
}
// TODO:
/*
  ERROR modal refactor verbiage with props
  BUG with wiggle - not closing properly - Body not taking full height on desktop on menu bar close
  Unknown count text not showing in map view
  Add watsapp link for phone number on Click
  Add email link for email on Click
  Fix any lighthouse issues
*/

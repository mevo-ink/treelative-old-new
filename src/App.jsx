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
  Set all users to have unverified flag set to true
  Authentication with Firebase Magic Email
  Add tooltips for pie and bar charts - for insights - with user avatars that fall under that category
  Add PWA prompt
  Refactor Error Modal
  Add find me ring indicator graph view
  MAKE YouTube VIDEO OF how to / intro

  API
    - query to suggest users with no email - unauthenticated endpoint
    - mutation to update a user's email - authenticated endpoint - but check for firebase token
    - mutation to create a new user - authenticated endpoint - but check for firebase token
    - loginWIthProvider - 2 different responses
      - without email - We could not find an account associated with the email
      - with email, but unverified - please wait
      - success

  LOGIN PROCESS - OAUTH
   - all users will have unverified flag set to true at the beginning
   - if the user has a profile associated wit the email - continue
   - else:
     - Give the user to choose from existing users with no email associated
     - If the user chooses an existing user, update the profile with the email: remove the unverified flag after manual verification
     - If the user chooses to create a new user, create a new profile with the email: remove the unverified flag after manual verification

    Add two new queries:
    - Get users by age
    - Get users by location
    - Use these both to show tooltips on charts - avatars
*/

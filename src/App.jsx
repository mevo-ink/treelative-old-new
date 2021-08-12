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
  Add PWA prompt
  Set all users to have unverified flag set to true - change default password
  API-
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
  Discuss about an ErrorModal - have atom state for error
  add option to reset password in UI for admin
  MAKE YouTube VIDEO OF how to / intro
  USER FEEDBACKS
   - Login la auth providers are not intuitive aam
     - either keep username/password login as a separate modal - or make auth providers icon more prominent - user original logo colors/something ..

  - How can a non-admin user edit their child profile? or their deceased parent profile?
    - add new authorization flag for a user to edit their direct family member profile?
    - Add isEditable in getUser response - bases on direct family members
  Remove find me indicator on layout change
  Add find me ring indicator graph view
  Change couple icon in slide switcher
  Optimize image before uploading to minio - limit frontend image size
  Show unavaialble phonenumber and email always
  - Add tooltips for pie and bar charts - for insights - with user avatars that fall under that category
    Add two new queries:
    - Get users by age
    - Get users by location
    - Use these both to show tooltips on charts - avatars
*/

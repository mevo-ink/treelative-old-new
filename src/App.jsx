import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Menu from 'components/Menu'
import Layouts from 'components/Layouts'
import ProfileCard from 'components/ProfileCard'
// import ProfileCardChumma from 'components/ProfileCardChumma'

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

  return (
    <>
      {activeNodeID && <ProfileCard />}
      <Menu />
      <Layouts />
    </>
  )
}
// JANA
// TODO:
/*
  CALENDAR styling
  BUG: dropdown select not working on mobile
  Add remove button for all editable fields
  Show default suggestion on edit user
  Add confirmation dialog on delete
  Finish search bar
  - On search results click, open the profile card
  Investigate google maps overlay buttons
  Add birthday viw - kinda same layout as age view
  Show add new user from children-parent edit dialog
  Add functionality FindMe on birthday view
  Style Error modal with contact us info --- NEED ACCESS TO OUR PROFILE CARDS FOR NOT AUTH USERS
  Add fallback modal to edit date of birth if unavailable when clicking findMe
  Desktop: Add max width to Menu slider and profile card
  Insights:
  - Center label
  - Show users count by country
  Add birthday effect on profile mount - maybe not
  Show why login
  Add google analytics
  Add PWA
  Optimize images
*/
// DONE:
/*
  Add absolute position marker on map Image
  Connect phoneNumber edit to API
  Connect email edit to API
  Connect social links edit to API
  Add close button to profile card
  Show findMe to profile card
  Remove all optional fields from add new user
  Fix scrolling position on desktop mode - map vertical to horizontal
  Check on focus style for FindMe button on disabled
  Add functionality FindMe on age view
  Replace add user to own profile icon for normal users
  Complete Age view
  - add functionality to center any user
*/

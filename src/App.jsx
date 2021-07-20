import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Menu from 'components/Menu'
import Layouts from 'components/Layouts'
import ProfileCard from 'components/ProfileCard'

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
// TODO:
/*
  profileCard URI for Age layout
  slides shifting by one slide, when editMode id toggled. (problem - Death Slide)
  CALENDAR styling
  Finish search bar
  - On search results click, open the profile card
  Add birthday viw - kinda same layout as age view
  Add functionality FindMe on birthday view
  Style Error modal with contact us info --- NEED ACCESS TO OUR PROFILE CARDS FOR NOT AUTH USERS
  Add fallback modal to edit date of birth if unavailable when clicking findMe
  Desktop: Add max width to Menu slider and profile card
  Insights:
  - Center label
  - Show users count by country
  Add birthday effect on profile mount - maybe not
  Show why login
  Add PWA
  Optimize images
  Add couple - marriage date and location edits
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
  Add google analytics
  Show add new user from children-parent edit dialog
  Show default suggestion on edit user
  BUG: dropdown select not working on mobile
  Investigate google maps overlay buttons
  PERSIST layout changes
  REDRAW CANVAS on relation edits
  Add clear button for all editable fields
  Fix social card - phoneNumber and email not editable if empty
  Add confirmation dialog on delete
  Fix couple - add/remove logic
*/

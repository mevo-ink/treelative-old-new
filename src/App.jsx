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
  Make couples mutations similar to parents and child (userID & relationID) -- need to discuss :p
  Style Error modal with contact us info --- NEED ACCESS TO OUR PROFILE CARDS FOR NOT AUTH USERS
  Insights - popup dialog with chart:
  - Show users distribution by country
  - Show users distribution by age
  Add birthday effect on profile card mount
  Add PWA
  Optimize images
  Add couple - marriage date and location edits
  Add logic to show active node in birthday view with AGE
  Add privacy slide slide
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
  slides shifting by one slide, when editMode id toggled. (problem - Death Slide)
  Add birthday view with dummy layout and connect with API
  Add fallback modal to edit date of birth if unavailable when clicking findMe
  Add fallback modal to edit location if unavailable when clicking findMe
  Add functionality FindMe on birthday view
  Handle refetching of data on layout related property change
  Desktop: Add max width to Menu slider and profile card
  Style birthday viw - kinda same layout as age view
  Remove Location marker for unknown location
  Insights:
  - Center label
  Finish search bar
  - On search results click, open the profile card
  BUG: Unable to go to previous slide. (probably after fixing slide skipping bug in edit-mode)
  CALENDAR styling
  Show why login - info message on login slide
*/

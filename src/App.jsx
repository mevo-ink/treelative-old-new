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
  Do not show remove button if value is empty
  Do not allow to clear full name
  Double check all modal titles
  BUG:
    - Profile card update - post action - check if in network mode
  Double check all titles of confirmation delete modal
  Style Error modal with contact us info --- NEED ACCESS TO OUR PROFILE CARDS FOR NOT AUTH USERS
  Add birthday effect on profile card mount
  Add PWA
  Add privacy slide slide
  Add new property to user : isPublic in backend
  Add content to insight modal
  Investigate cache bug on updating partner on slides
  Fix cache issue on menu bar after login
  SCHEMA CHANGE
  Return actual data for age distribution insights
  Return actual data for country distribution insights
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
  Insights - popup dialog with chart:
  - Show users distribution by country
  - Show users distribution by age
  Convert google places search to backend
  id dead - calculate proper Age
  Fix button inside button for edit button
  Show some indication on age view if DEAD
  Disable - clicking on relation avatar on edit mode
  Add couple - marriage date and location edits
  Don't close menu drawer
  Optimize images
  Add logic to show active node in birthday view with AGE
  BUGs:
    - delete and some edit are not working (i went to your last commit and checked.. not working)
    - No way to close search results expect closing the whole menu
    - Partner slide not working
  Separate active indicator component
  Add clear button on search results
  Refactor DatePicker Modal & Trigger
  Refactor location Modal and Trigger
*/

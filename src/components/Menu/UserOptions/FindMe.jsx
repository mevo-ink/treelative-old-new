import { useRouter } from 'next/router'
import { useState } from 'react'

import { useQueryClient } from 'react-query'

import { IconButton } from '@chakra-ui/react'
import { BiCurrentLocation } from 'react-icons/bi'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import DateOfBirth from 'components/EditUser/DateOfBirth'
import CurrentLocation from 'components/EditUser/CurrentLocation'

export default function FindMe ({ onClose, user, ...styles }) {
  const router = useRouter()

  const queryClient = useQueryClient()

  const layout = router.pathname.split('/')[2]

  const layoutMethods = useRecoilValue(layoutMethodsAtom)

  const [isEditDateOfBirthOpen, setIsEditDateOfBirthOpen] = useState(false)
  const [isEditCurrentLocationOpen, setIsEditCurrentLocationOpen] = useState(false)

  const handleFindMe = () => {
    const hasFoundUser = layoutMethods.findUser(user)
    if (hasFoundUser) {
      onClose()
    } else {
      if (layout === 'map') setIsEditCurrentLocationOpen(true)
      else if (['age', 'birthday'].includes(layout)) setIsEditDateOfBirthOpen(true)
    }
  }

  const handleEditDateOfBirthClose = async (response) => {
    if (response) {
      queryClient.resetQueries('getBirthdayData')
      queryClient.resetQueries('getAgeData')
    }
    setIsEditDateOfBirthOpen(false)
  }

  const handleEditCurrentLocationClose = async (response) => {
    if (response) {
      queryClient.resetQueries('getMapData')
    }
    setIsEditCurrentLocationOpen(false)
  }

  return (
    <>
      {isEditDateOfBirthOpen && (
        <DateOfBirth
          defaultIsOpen
          user={user}
          onClose={handleEditDateOfBirthClose}
          alert='Date of birth is required to locate this user'
        />
      )}
      {isEditCurrentLocationOpen && (
        <CurrentLocation
          defaultIsOpen
          user={user}
          onClose={handleEditCurrentLocationClose}
          alert='Current Location is required to locate yourself'
        />
      )}
      <IconButton
        isRound
        icon={<BiCurrentLocation />}
        aria-label='Find Me Button'
        bg='hsla(220, 100%, 60%, .8)'
        onClick={handleFindMe}
        {...styles}
      />
    </>
  )
}

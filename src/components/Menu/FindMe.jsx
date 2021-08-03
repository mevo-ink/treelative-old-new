import { useState } from 'react'

import { IconButton } from '@chakra-ui/react'
import { BiCurrentLocation } from 'react-icons/bi'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import {
  layoutAtom,
  layoutMethodsAtom,
  networkMethodsAtom,
  activeNodePulseIDAtom,
  mapMethodsAtom
} from 'utils/atoms.js'

import DateOfBirth from 'components/EditUser/DateOfBirth'
import CurrentLocation from 'components/EditUser/CurrentLocation'

export default function FindMe ({ onClose, user, ...styles }) {
  const layout = useRecoilValue(layoutAtom)
  const layoutMethods = useRecoilValue(layoutMethodsAtom)

  const networkMethods = useRecoilValue(networkMethodsAtom)
  const mapMethods = useRecoilValue(mapMethodsAtom)

  const setActiveNodePulseID = useSetRecoilState(activeNodePulseIDAtom)

  const [isEditDateOfBirthOpen, setIsEditDateOfBirthOpen] = useState(false)
  const [isEditCurrentLocationOpen, setIsEditCurrentLocationOpen] = useState(false)

  const handleFindMe = () => {
    let position
    switch (layout) {
      case 'map':
        position = mapMethods.panTo(user.id)
        setActiveNodePulseID(user.id)
        if (!position) {
          setIsEditCurrentLocationOpen(true)
        } else {
          onClose()
        }
        break
      case 'age':
        if (!user.dateOfBirth) {
          setIsEditDateOfBirthOpen(true)
        } else {
          setTimeout(() => {
            setActiveNodePulseID(user.id)
            document.getElementById(user.dateOfBirth.slice(0, 4)).scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 150)
          onClose()
        }
        break
      case 'birthday':
        if (!user.dateOfBirth) {
          setIsEditDateOfBirthOpen(true)
        } else {
          setTimeout(() => {
            setActiveNodePulseID(user.id)
            document.getElementById(user.dateOfBirth.slice(5, 10)).scrollIntoView({ behavior: 'smooth', block: 'center' })
          }, 150)
          onClose()
        }
        break
      default:
        networkMethods.moveTo(user.id)
        onClose()
        break
    }
  }

  const handleEditDateOfBirthClose = (response) => {
    setIsEditDateOfBirthOpen(false)
    response && layoutMethods.refetch()
  }

  const handleEditCurrentLocationClose = (response) => {
    setIsEditCurrentLocationOpen(false)
    response && layoutMethods.refetch()
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
        bg='hsla(220, 100%, 60%, .8)'
        onClick={handleFindMe}
        {...styles}
      />
    </>
  )
}

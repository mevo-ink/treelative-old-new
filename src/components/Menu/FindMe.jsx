import { useState } from 'react'

import { IconButton } from '@chakra-ui/react'
import { BiCurrentLocation } from 'react-icons/bi'

import { useRecoilValue } from 'recoil'

import {
  layoutAtom,
  networkMethodsAtom,
  mapMethodsAtom
} from 'utils/atoms.js'

import EditUserDateOfBirth from 'components/EditUser/EditUserDateOfBirth'
import EditUserCurrentLocation from 'components/EditUser/EditUserCurrentLocation'

export default function FindMe ({ onClose, user, ...styles }) {
  const layout = useRecoilValue(layoutAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)
  const mapMethods = useRecoilValue(mapMethodsAtom)

  const [isEditDateOfBirthOpen, setIsEditDateOfBirthOpen] = useState(false)
  const [isEditCurrentLocationOpen, setIsEditCurrentLocationOpen] = useState(false)

  const handleFindMe = () => {
    let position
    switch (layout) {
      case 'map':
        position = mapMethods.panTo(user.id)
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
            document.getElementById(new Date(user.dateOfBirth).toLocaleDateString('default', { month: 'short', day: 'numeric' })).scrollIntoView({ behavior: 'smooth', block: 'center' })
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

  return (
    <>
      {isEditDateOfBirthOpen && (
        <EditUserDateOfBirth
          defaultIsOpen
          user={user}
          onClose={() => setIsEditDateOfBirthOpen(false)}
          alert='Date of birth is required to locate this user'
        />
      )}
      {isEditCurrentLocationOpen && (
        <EditUserCurrentLocation
          defaultIsOpen
          user={user}
          onClose={() => setIsEditCurrentLocationOpen(false)}
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

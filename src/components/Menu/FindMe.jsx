import { IconButton } from '@chakra-ui/react'
import { BiCurrentLocation } from 'react-icons/bi'

import { useRecoilValue } from 'recoil'

import {
  layoutAtom,
  networkMethodsAtom,
  mapMethodsAtom
} from 'utils/atoms.js'

export default function FindMe ({ onClose, user, ...styles }) {
  const layout = useRecoilValue(layoutAtom)

  const networkMethods = useRecoilValue(networkMethodsAtom)
  const mapMethods = useRecoilValue(mapMethodsAtom)

  const handleFindMe = () => {
    switch (layout) {
      case 'map':
        mapMethods.panTo(user.id)
        break
      case 'age':
        setTimeout(() => {
          document.getElementById(user.dateOfBirth.slice(0, 4)).scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 150)
        break
      case 'birthday':
        setTimeout(() => {
          document.getElementById(new Date(user.dateOfBirth).toLocaleDateString('default', { month: 'short', day: 'numeric' })).scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 150)
        break
      default:
        networkMethods.moveTo(user.id)
        break
    }
    onClose()
  }

  return (
    <IconButton
      isRound
      icon={<BiCurrentLocation />}
      bg='hsla(220, 100%, 60%, .8)'
      onClick={handleFindMe}
      {...styles}
    />
  )
}

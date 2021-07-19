import { IconButton } from '@chakra-ui/react'
import { BiCurrentLocation } from 'react-icons/bi'

import { useRecoilValue } from 'recoil'

import {
  layoutAtom,
  networkMethodsAtom,
  mapMethodsAtom
} from 'utils/atoms.js'

export default function FindMe ({ onClose, authUser }) {
  const layout = useRecoilValue(layoutAtom)

  const networkMethods = useRecoilValue(networkMethodsAtom)
  const mapMethods = useRecoilValue(mapMethodsAtom)

  const handleFindMe = () => {
    switch (layout) {
      case 'map':
        mapMethods.panTo(authUser.id)
        break
      case 'age':
        setTimeout(() => {
          document.getElementById(authUser.dateOfBirth.slice(0, 4)).scrollIntoView({ behavior: 'smooth', block: 'center' })
        }, 150)
        break
      default:
        networkMethods.moveTo(authUser.id)
        break
    }
    onClose()
  }

  return (
    <IconButton
      isRound
      icon={<BiCurrentLocation color='white' />}
      size='sm'
      bg='hsla(220, 100%, 60%, .8)'
      onClick={handleFindMe}
    />
  )
}

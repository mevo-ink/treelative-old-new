import { useRecoilValue } from 'recoil'
import {
  layoutAtom,
  networkMethodsAtom,
  mapMethodsAtom
} from 'utils/atoms.js'

import { IconButton } from '@chakra-ui/react'

import { BiCurrentLocation } from 'react-icons/bi'

import parseJwt from 'utils/parseJWT'

export default function FindMe ({ onClose }) {
  const layout = useRecoilValue(layoutAtom)

  const { id: authUserID } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  const networkMethods = useRecoilValue(networkMethodsAtom)
  const mapMethods = useRecoilValue(mapMethodsAtom)

  const handleFindMe = () => {
    switch (layout) {
      case 'map':
        mapMethods.panTo(authUserID)
        break
      case 'age':
        console.log('TODO: CENTER AUTH USER ON AGE VIEW')
        break
      default:
        networkMethods.moveTo(authUserID)
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
      _hover={!authUserID && 'hsla(220, 100%, 60%, .8)'}
      _active={!authUserID && 'hsla(220, 100%, 60%, .8)'}
      onClick={handleFindMe}
      isDisabled={!authUserID}
    />
  )
}

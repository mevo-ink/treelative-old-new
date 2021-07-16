import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  layoutAtom,
  networkMethodsAtom,
  findMeAtom
} from 'utils/atoms.js'

import { IconButton } from '@chakra-ui/react'

import { BiCurrentLocation } from 'react-icons/bi'

import parseJwt from 'utils/parseJWT'

export default function FindMe ({ onClose }) {
  const layout = useRecoilValue(layoutAtom)

  const { id: authUserID } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  const networkMethods = useRecoilValue(networkMethodsAtom)
  const setFindMe = useSetRecoilState(findMeAtom)

  const handleFindMe = () => {
    switch (layout) {
      case 'map':
        setFindMe(true)
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
      bg='hsla(220, 98%, 57%, .8)'
      onClick={handleFindMe}
      isDisabled={!authUserID}
    />
  )
}

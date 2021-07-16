import { useRecoilValue } from 'recoil'
import { networkMethodsAtom } from 'utils/atoms.js'

import { IconButton } from '@chakra-ui/react'

import { BiCurrentLocation } from 'react-icons/bi'

import parseJwt from 'utils/parseJWT'

export default function FindMe ({ onClose }) {
  const { id: authUserID } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  const networkMethods = useRecoilValue(networkMethodsAtom)

  const handleFindMe = () => {
    networkMethods.moveTo(authUserID)
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

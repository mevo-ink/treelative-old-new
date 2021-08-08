import { Image, Button } from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'

import { activeNodeIDAtom } from 'utils/atoms.js'

export default function Profile ({ onClose, authUser }) {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const handleClick = () => {
    setActiveNodeID(authUser.id)
  }

  return (
    <Button
      size='sm'
      p='0'
      bg='hsla(220, 100%, 60%, .8)'
      borderRadius='50%'
      onClick={handleClick}
    >
      <Image
        src={authUser.avatar}
        fallbackSrc={`https://ui-avatars.com/api/?name=${authUser.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
        alt='avatar'
        w='100%'
        h='100%'
        borderRadius='50%'
      />
    </Button>
  )
}

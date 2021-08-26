import { useRouter } from 'next/router'

import { Image, Button } from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'

import { activeNodeIDAtom } from 'utils/atoms.js'

export default function Profile ({ onClose, authUser }) {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const router = useRouter()

  const handleClick = () => {
    if (authUser) setActiveNodeID(authUser.id)
    else router.push('/auth/login')
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
        src={authUser?.avatar}
        fallbackSrc='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HjQfYqYBsspqy-iV0-Cw5uHo-cH-3TbhbAugLXu7RnL9lmqiPZUkqBy-XpKfandg7FQ&usqp=CAU'
        alt='avatar'
        w='2rem'
        h='2rem'
        borderRadius='50%'
      />
    </Button>
  )
}

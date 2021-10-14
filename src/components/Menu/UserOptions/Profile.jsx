import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

import { Image, Button } from '@chakra-ui/react'

export default function Profile ({ authUser }) {
  const router = useRouter()

  const handleClick = () => {
    if (authUser) {
      router.push(`?userID=${authUser.id}`, `/users/${authUser.id}`, { shallow: true, scroll: false })
    } else {
      setCookie(null, 'REDIRECT_REFERRER', router.pathname, { path: '/' })
      router.push('?login=auth', '/auth/login', { shallow: true, scroll: false })
    }
  }

  return (
    <Button
      size='sm'
      mx='0.4rem'
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

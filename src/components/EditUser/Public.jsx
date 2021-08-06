import { useState, useEffect } from 'react'

import { Box, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useMutation } from 'urql'

import { TOGGLE_PUBLIC } from 'graphql/mutations/users'

const MotionBox = motion(Box)
export default function Public ({ user }) {
  const [isOn, setIsOn] = useState(!user.isPublic)

  const [togglePublicResult, togglePublic] = useMutation(TOGGLE_PUBLIC)

  const handleTogglePublic = () => {
    const variables = { userID: user.id, input: { isPublic: isOn } }
    return togglePublic(variables)
  }

  useEffect(() => {
    handleTogglePublic()
    // eslint-disable-next-line
  }, [isOn])

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  }
  return (
    <Button
      display='flex'
      justifyContent={isOn ? 'flex-end' : 'flex-start'}
      w='40px'
      h='25px'
      p='3px'
      borderRadius='999px'
      cursor='pointer'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      background={isOn ? 'hsla(130, 65%, 55%, 1)' : 'hsla(0, 0%, 100%, .2)'}
      _active={{
        background: isOn ? 'hsla(130, 65%, 55%, 1)' : 'hsla(0, 0%, 100%, .2)'
      }}
      _hover={{
        background: isOn ? 'hsla(130, 65%, 55%, 1)' : 'hsla(0, 0%, 100%, .2)'
      }}
      isDisabled={togglePublicResult.fetching}
      onClick={() => setIsOn(!isOn)}
    >
      <MotionBox
        layout
        w='20px'
        h='20px'
        backgroundColor='white'
        borderRadius='50%'
        transition={spring}
      />
    </Button>
  )
}

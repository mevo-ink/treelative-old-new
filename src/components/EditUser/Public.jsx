import { Box, Button } from '@chakra-ui/react'
import { motion } from 'framer-motion'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

const MotionBox = motion(Box)
export default function Public ({ user }) {
  const { mutateAsync, isLoading } = useMutation(updateUserGeneral)

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleTogglePublic = () => {
    return mutateAsync({ userID: user.id, input: { isPublic: !user.isPublic } }, { onSuccess })
  }

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30
  }
  return (
    <Button
      display='flex'
      justifyContent={user.isPublic ? 'flex-end' : 'flex-start'}
      w='40px'
      h='26px'
      p='3px'
      borderRadius='999px'
      cursor='pointer'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      background={user.isPublic ? 'hsla(130, 65%, 55%, 1)' : 'hsla(0, 0%, 100%, .2)'}
      _active={{
        background: user.isPublic ? 'hsla(130, 65%, 55%, 1)' : 'hsla(0, 0%, 100%, .2)'
      }}
      _hover={{
        background: user.isPublic ? 'hsla(130, 65%, 55%, 1)' : 'hsla(0, 0%, 100%, .2)'
      }}
      isDisabled={isLoading}
      onClick={handleTogglePublic}
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

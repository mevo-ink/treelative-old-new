import {
  Flex,
  Text
} from '@chakra-ui/react'

import EditUserNotification from 'components/EditUser/EditUserNotification'

export default function Notification ({ user }) {
  return (
    <Flex
      w='80%'
      h='100%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      background='hsla(0, 0%, 100%, .2)'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      borderRadius='20px'
      p='1.5rem 0'
    >
      <Text variant='info-title'> Privacy </Text>
      <EditUserNotification user={user} />
    </Flex>
  )
}
import {
  Flex,
  Text
} from '@chakra-ui/react'

import EditUserPartner from 'components/EditUser/EditUserPartner'
import EditUserDateOfMarriage from 'components/EditUser/EditUserDateOfMarriage'

export default function ParentChild ({ user }) {
  return (
    <Flex
      w='80%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      background='hsla(0, 0%, 100%, .2)'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      borderRadius='20px'
      p='1.5rem 0'
    >
      <Text variant='info-title'> Partner </Text>
      <EditUserPartner user={user} />
      <Text variant='info-title' mt='1rem'> Date Of Marriage </Text>
      <EditUserDateOfMarriage user={user} />
    </Flex>
  )
}

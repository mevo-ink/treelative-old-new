import {
  Flex,
  Text
} from '@chakra-ui/react'

import EditUserPartner from 'components/EditUser/EditUserPartner'

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
    </Flex>
  )
}

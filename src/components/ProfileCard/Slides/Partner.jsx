import { Flex, Text } from '@chakra-ui/react'

import Partner from 'components/EditUser/Partner'
import DateOfMarriage from 'components/EditUser/DateOfMarriage'
import MarriageLocation from 'components/EditUser/MarriageLocation'

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
      <Partner user={user} />
      {user.partner && (
        <>
          <Text variant='info-title' mt='1rem'> Date Of Marriage </Text>
          <DateOfMarriage user={user} />
        </>
      )}
      {user.partner && (
        <>
          <Text variant='info-title' mt='1rem'> Marriage Location </Text>
          <MarriageLocation user={user} />
        </>
      )}
    </Flex>
  )
}

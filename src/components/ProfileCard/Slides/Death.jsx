import { Flex, Text, Image } from '@chakra-ui/react'

import DateOfDeath from 'components/EditUser/DateOfDeath'

import tombstone from 'images/tombstone.svg'

export default function Death ({ user }) {
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
      <Text variant='info-title'>
        Date Of Death
      </Text>
      <DateOfDeath user={user} />
      <Image
        src={tombstone}
        alt='tombstone'
        w='85%'
        minH='20%'
        mt='1rem'
        cursor='pointer'
      />
    </Flex>
  )
}

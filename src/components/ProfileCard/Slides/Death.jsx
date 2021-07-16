import {
  Box,
  Flex,
  Text,
  Image
} from '@chakra-ui/react'

import EditUserDateOfDeath from 'components/EditUser/EditUserDateOfDeath'
import EditUserDeathLocation from 'components/EditUser/EditUserDeathLocation'

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
      <EditUserDateOfDeath user={user} />
      <Image
        src={tombstone}
        alt='tombstone'
        w='85%'
        minH='20%'
        mt='1rem'
        cursor='pointer'
      />
      <Text variant='info-title' mt='1rem'>
        Death Location
      </Text>
      <EditUserDeathLocation user={user} />
      {user.deathLocation && (
        <Box
          as='iframe'
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}&q=place_id:${user.deathLocation.place_id}&zoom=10`}
          title='death-location'
          w='85%'
          minH='20%'
          mt='1rem'
          border='none'
          boxShadow='0px 3px 5px hsla(0, 0%, 0%, .25)'
          borderRadius='20px'
          cursor='pointer'
        />
      )}
    </Flex>
  )
}
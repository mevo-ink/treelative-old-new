import {
  Flex,
  Text
} from '@chakra-ui/react'

import EditUserCurrentLocation from 'components/EditUser/EditUserCurrentLocation'

import LocationRenderer from 'components/_common/LocationRenderer'

export default function Current ({ user }) {
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
      <Text variant='info-title'>
        Current Location
      </Text>
      <EditUserCurrentLocation user={user} />
      {user.currentLocation && <LocationRenderer placeID={user.currentLocation.suggested.place_id} />}
    </Flex>
  )
}

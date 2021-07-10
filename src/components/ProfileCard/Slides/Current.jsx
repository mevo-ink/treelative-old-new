import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'

import EditUserCurrentLocation from 'components/EditUser/EditUserCurrentLocation'

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
      {user.currentLocation && (
        <Box
          as='iframe'
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}&q=place_id:${user.currentLocation.place_id}&zoom=10`}
          title='current-location'
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

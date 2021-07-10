import {
  Box,
  Flex,
  Text
} from '@chakra-ui/react'

export default function Birth ({ user }) {
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
        Date Of Birth
      </Text>
      <Text variant='info'>
        {user.dateOfBirth ? user.dateOfBirth.slice(0, 10).replaceAll('-', '/') : 'Unavailable'}
      </Text>
      <Text variant='info-title' mt='1rem'>
        Birth Location
      </Text>
      <Text variant='info'>
        {user.birthLocation ? user.birthLocation.terms.slice(-3).map(({ value }) => value).join(', ') : 'Unavailable'}
      </Text>
      <Box
        as='iframe'
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}&q=place_id:${user.birthLocation.place_id}&zoom=10`}
        loading='lazy'
        title='birth-location'
        w='85%'
        minH='20%'
        mt='1rem'
        border='none'
        boxShadow='0px 3px 5px hsla(0, 0%, 0%, .25)'
        borderRadius='20px'
        cursor='pointer'
      />
    </Flex>
  )
}

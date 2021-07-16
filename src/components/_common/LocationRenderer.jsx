import { Box, Image } from '@chakra-ui/react'

import infoUnavailable from 'images/infoUnavailable.png'

export default function LocationRenderer ({ placeID }) {
  return (
    placeID
      ? (
        <Box
          as='iframe'
          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}&q=place_id:${placeID}&zoom=10`}
          title='birth-location'
          w='85%'
          minH='20%'
          mt='1rem'
          border='none'
          boxShadow='0px 3px 5px hsla(0, 0%, 0%, .25)'
          borderRadius='20px'
          cursor='pointer'
        />
        )
      : (
        <Image
          src={infoUnavailable}
          title='birth-location'
          w='85%'
          minH='20%'
          mt='1rem'
          border='none'
          boxShadow='0px 3px 5px hsla(0, 0%, 0%, .25)'
          borderRadius='20px'
          cursor='pointer'
        />
        )
  )
}

import {
  Box,
  Link
} from '@chakra-ui/react'

import infoUnavailable from 'images/infoUnavailable.png'

export default function LocationRenderer ({ location }) {
  let imageURL = infoUnavailable

  if (location) {
    const { lat, lng } = location.geometry.location
    imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=200x130&key=${process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}`
  }

  return (
    <Link isExternal href={location?.url} mt='1rem' w='80%'>
      <Box
        w='100%'
        h='100px'
        boxShadow='0px 3px 5px hsla(0, 0%, 0%, .25)'
        borderRadius='20px'
        cursor='pointer'
        backgroundImage={`url(${imageURL})`}
        backgroundSize='auto 100%'
        backgroundPosition='center center'
      />
    </Link>
  )
}

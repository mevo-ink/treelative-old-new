import { Grid, Link, Image } from '@chakra-ui/react'

import infoUnavailable from 'images/infoUnavailable.png'

export default function LocationRenderer ({ location, avatar, fullName }) {
  let imageURL = infoUnavailable

  if (location) {
    const { lat, lng } = location.geometry.location
    imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=230x200&key=${process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}`
  }

  return (
    <Link isExternal href={location?.url} mt='1rem' w='80%'>
      <Grid
        w='100%'
        h='100px'
        boxShadow='0px 3px 5px hsla(0, 0%, 0%, .25)'
        borderRadius='20px'
        cursor='pointer'
        backgroundImage={`url(${imageURL})`}
        backgroundSize='100% auto'
        backgroundPosition='center center'
        placeItems='center'
      >
        <Image
          src={avatar}
          fallbackSrc={`https://ui-avatars.com/api/?name=${fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
          alt='avatar'
          objectFit='contain'
          w='20px'
          borderRadius='50%'
          border='2px solid hsla(220, 98%, 57%, 1)'
          boxShadow='0px 6px 8px hsla(0, 0%, 0%, .6)'
        />
      </Grid>
    </Link>
  )
}

import { Box, Grid, Link, Image, keyframes } from '@chakra-ui/react'

import infoUnavailable from 'images/infoUnavailable.png'

export default function LocationRenderer ({ location, avatar, fullName }) {
  let imageURL = infoUnavailable

  if (location) {
    const { lat, lng } = location.geometry.location
    imageURL = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=15&size=230x200&key=${process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}`
  }

  const pulse = keyframes`
    0% { transform: scale(0.1, 0.1); opacity: 0; }
    50% { opacity: 1;)
    100% { transform: scale(1.2, 1.2); opacity: 0;
  `

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
        position='relative'
      >
        {location && (
          <>
            <Box
              w='30px'
              h='30px'
              borderRadius='50% 50% 50% 0'
              bg='hsla(220, 98%, 57%, 1)'
              transform='rotate(-45deg)'
              mb='30px'
            >
              <Image
                src={avatar}
                fallbackSrc={`https://ui-avatars.com/api/?name=${fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                alt='avatar'
                w='30px'
                objectFit='contain'
                transform='rotate(45deg)'
                borderRadius='50%'
                border='3px solid hsla(220, 98%, 57%, 1)'
              />
            </Box>
            <Box
              bg='rgba(0, 0, 0, 0.2)'
              borderRadius='50%'
              w='14px'
              h='14px'
              position='absolute'
              left='50%'
              top='50%'
              transform='translateX(-7px) rotateX(55deg)'
              _after={{
                content: '""',
                borderRadius: '50%',
                w: '40px',
                h: '40px',
                position: 'absolute',
                m: '-13px 0 0 -13px',
                animation: `${pulse} 1s infinite ease-out`,
                opacity: '0',
                boxShadow: '0 0 1px 2px hsla(220, 98%, 57%, 1)',
                animationDelay: '1s'
              }}
            />
          </>
        )}
      </Grid>
    </Link>
  )
}

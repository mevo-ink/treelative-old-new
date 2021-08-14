import { Grid, Stack } from '@chakra-ui/react'

import Email from 'components/EditUser/Email'
import Social from 'components/EditUser/Social'
import PhoneNumber from 'components/EditUser/PhoneNumber'

export default function Socials ({ user }) {
  const data = [
    { url: user.social?.instagram, icon: 'images/instagram.svg', name: 'Instagram', baseURL: 'https://instagram.com/' },
    { url: user.social?.facebook, icon: 'images/facebook.svg', name: 'Facebook', baseURL: 'https://facebook.com/' },
    { url: user.social?.twitter, icon: 'images/twitter.svg', name: 'Twitter', baseURL: 'https://twitter.com/' },
    { url: user.social?.linkedin, icon: 'images/linkedin.svg', name: 'linkedin', baseURL: 'https://linkedin.com/in/' }
  ]

  return (
    <Stack
      w='80%'
      h='100%'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      background='hsla(0, 0%, 100%, .2)'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      borderRadius='20px'
      p='1.5rem 0'
    >
      <PhoneNumber user={user} icon='images/phone.svg' />
      <Grid w='55%' gridTemplateColumns='repeat(2, 1fr)' flexFlow='wrap'>
        {data.map((social, idx) => (
          <Social key={idx} social={social} userID={user.id} />
        ))}
      </Grid>
      <Email user={user} icon='images/email.svg' />
    </Stack>
  )
}

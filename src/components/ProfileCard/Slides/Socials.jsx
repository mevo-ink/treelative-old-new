import { Grid, Stack } from '@chakra-ui/react'

import Email from 'components/EditUser/Email'
import Social from 'components/EditUser/Social'
import PhoneNumber from 'components/EditUser/PhoneNumber'

import email from 'images/email.svg'
import phone from 'images/phone.svg'
import twitter from 'images/twitter.svg'
import facebook from 'images/facebook.svg'
import instagram from 'images/instagram.svg'
import linkedin from 'images/linkedin.svg'

export default function Socials ({ user }) {
  const data = [
    { url: user.social?.instagram, icon: instagram, name: 'Instagram', baseURL: 'https://instagram.com/' },
    { url: user.social?.facebook, icon: facebook, name: 'Facebook', baseURL: 'https://facebook.com/' },
    { url: user.social?.twitter, icon: twitter, name: 'Twitter', baseURL: 'https://twitter.com/' },
    { url: user.social?.linkedin, icon: linkedin, name: 'linkedin', baseURL: 'https://linkedin.com/in/' }
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
      <PhoneNumber user={user} icon={phone} />
      <Grid w='55%' gridTemplateColumns='repeat(2, 1fr)' flexFlow='wrap'>
        {data.map((social, idx) => (
          <Social key={idx} social={social} userID={user.id} />
        ))}
      </Grid>
      <Email user={user} icon={email} />
    </Stack>
  )
}

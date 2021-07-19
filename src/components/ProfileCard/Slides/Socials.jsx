import {
  Grid,
  Flex,
  Image,
  Button
} from '@chakra-ui/react'

import EditUserEmail from 'components/EditUser/EditUserEmail'
import EditUserPhoneNumber from 'components/EditUser/EditUserPhoneNumber'

import email from 'images/email.svg'
import phone from 'images/phone.svg'
import twitter from 'images/twitter.svg'
import facebook from 'images/facebook.svg'
import linkedIn from 'images/linkedIn.svg'
import instagram from 'images/instagram.svg'

export default function Socials ({ user }) {
  const data = [
    { icon: instagram, url: user.socialLinks.filter(social => social.type === 'INSTAGRAM')[0]?.url },
    { icon: facebook, url: user.socialLinks.filter(social => social.type === 'FACEBOOK')[0]?.url },
    { icon: twitter, url: user.socialLinks.filter(social => social.type === 'TWITTER')[0]?.url },
    { icon: linkedIn, url: user.socialLinks.filter(social => social.type === 'LINKEDIN')[0]?.url }
  ]
  return (
    <Flex
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
      {user.phoneNumber && <EditUserPhoneNumber user={user} icon={phone} />}
      <Grid
        w='55%'
        gridTemplateColumns='repeat(2, 1fr)'
        flexFlow='wrap'
      >
        {data.map((social, idx) => (
          <Button
            key={idx}
            p='0'
            onClick={() => window.open(social.url, '_blank').focus()}
            isDisabled={!social.url}
            m='1rem 0'
          >
            <Image
              src={social.icon}
              w='40px'
              objectFit='contain'
              filter={!social.url && 'grayscale(100%)'}
            />
          </Button>
        ))}
      </Grid>
      {user.email && <EditUserEmail user={user} icon={email} />}
    </Flex>
  )
}

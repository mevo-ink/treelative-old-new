import { Grid, Flex } from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import EditUserEmail from 'components/EditUser/EditUserEmail'
import EditSocialURL from 'components/EditUser/EditSocialURL'
import EditUserPhoneNumber from 'components/EditUser/EditUserPhoneNumber'

import email from 'images/email.svg'
import phone from 'images/phone.svg'
import twitter from 'images/twitter.svg'
import facebook from 'images/facebook.svg'
import linkedIn from 'images/linkedIn.svg'
import instagram from 'images/instagram.svg'

export default function Socials ({ user }) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const data = [
    { ...user.socialLinks.filter(social => social.type === 'INSTAGRAM')[0], icon: instagram, name: 'Instagram' },
    { ...user.socialLinks.filter(social => social.type === 'FACEBOOK')[0], icon: facebook, name: 'Facebook' },
    { ...user.socialLinks.filter(social => social.type === 'TWITTER')[0], icon: twitter, name: 'Twitter' },
    { ...user.socialLinks.filter(social => social.type === 'LINKEDIN')[0], icon: linkedIn, name: 'LinkedIn' }
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
      <Grid w='55%' gridTemplateColumns='repeat(2, 1fr)' flexFlow='wrap'>
        {data.map((social, idx) => (<EditSocialURL key={idx} social={social} isDisabled={!isEditMode} />))}
      </Grid>
      {user.email && <EditUserEmail user={user} icon={email} />}
    </Flex>
  )
}

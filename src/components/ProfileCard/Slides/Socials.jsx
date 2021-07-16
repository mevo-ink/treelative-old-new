import {
  Flex,
  Text
} from '@chakra-ui/react'

import email from 'images/email.svg'
import phone from 'images/phone.svg'
import twitter from 'images/email.svg'
import facebook from 'images/facebook.svg'
import linkedIn from 'images/linkedIn.svg'
import instagram from 'images/instagram.svg'

export default function Socials ({ user }) {
  console.log(user, 'hello')
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
      H
    </Flex>
  )
}

import {
  Text,
  Image,
  Flex
} from '@chakra-ui/react'

export default function Birth ({ user }) {
  return (
    <Flex
      width='255px'
      minH='285px'
      flexDirection='column'
      alignItems='center'
      background='rgba(255, 255, 255, 0.20)'
      boxShadow='0px 3px 5px rgba(0, 0, 0, 0.20)'
      borderRadius='20px'
      userSelect='none'
      fontFamily='Lato'
      color='#26114D'
      position='relative'
    >
      <Text position='absolute' top='31px' lineHeight='7px' fontSize='7px'>
        Date Of Birth
      </Text>
      <Text position='absolute' top='38px' lineHeight='18px' fontSize='18px'>
        {user.dateOfBirth.slice(0, 10).replaceAll('-', '/')}
      </Text>
      <Text position='absolute' top='69px' lineHeight='7px' fontSize='7px'>
        Birth Location
      </Text>
      <Text position='absolute' top='76px' lineHeight='18px' fontSize='18px'>
        {user.birthLocation.terms.slice(-3).map(({ value }) => value).join(', ')}
      </Text>
      <Image
        src='https://assets-global.website-files.com/6050a76fa6a633d5d54ae714/609147088669907f652110b0_report-an-issue(about-maps).jpeg'
        draggable='false'
        width='227px'
        height='152px'
        boxShadow='0px 3px 5px rgba(0, 0, 0, 0.15)'
        borderRadius='20px'
        position='absolute'
        top='114px'
      />
    </Flex>
  )
}

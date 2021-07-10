import {
  Text,
  Image,
  Flex
} from '@chakra-ui/react'

export default function Birth ({ user }) {
  return (
    <Flex
      width='80%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      background='hsla(0, 0%, 100%, .2)'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      borderRadius='20px'
    >
      <Text variant='info-title'>
        Date Of Birth
      </Text>
      <Text variant='info'>
        {user.dateOfBirth.slice(0, 10).replaceAll('-', '/')}
      </Text>
      <Text variant='info-title' mt='1rem'>
        Birth Location
      </Text>
      <Text variant='info'>
        {user.birthLocation.terms.slice(-3).map(({ value }) => value).join(', ')}
      </Text>
      <Image
        src='https://assets-global.website-files.com/6050a76fa6a633d5d54ae714/609147088669907f652110b0_report-an-issue(about-maps).jpeg'
        w='85%'
        minH='20%'
        mt='1rem'
        border='none'
        boxShadow='0px 3px 5px hsla(0, 0%, 0%, .25)'
        borderRadius='20px'
        cursor='pointer'
      />
    </Flex>
  )
}

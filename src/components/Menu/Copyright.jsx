import { Text, Link } from '@chakra-ui/react'

export default function Copyright () {
  return (
    <Text color='hsla(0, 0%, 100%, 1)' textAlign='center' fontSize='.6rem'>
      &#xA9; 2020-2021. All Rights Reserved by
      <Link href='https://arun99.dev' isExternal fontWeight='600'> Arun </Link>
      &#38;
      <Link href='https://jana19.dev' isExternal fontWeight='600'> Jana</Link>.
    </Text>
  )
}

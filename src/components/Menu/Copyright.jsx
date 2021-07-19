import { Text, Link } from '@chakra-ui/react'

export default function Copyright () {
  return (
    <Text textAlign='center' fontSize='.6rem'>
      &#xA9; {new Date().getFullYear()}. Designed by &nbsp;
      <Link href='https://arun99.dev' isExternal fontWeight='600'>Arun</Link>
      &nbsp; &#38; &nbsp;
      <Link href='https://jana19.dev' isExternal fontWeight='600'>Jana</Link>.
    </Text>
  )
}

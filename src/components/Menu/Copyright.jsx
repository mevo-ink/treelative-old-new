import { Flex, Text, Link, useDisclosure } from '@chakra-ui/react'

import ErrorModal from 'components/_common/ErrorModal'

export default function Copyright () {
  const { isOpen, onOpen } = useDisclosure()
  return (
    <>
      {isOpen && <ErrorModal />}
      <Flex w='100%' justifyContent='space-between'>
        <Text fontSize='.6rem' pb='1rem'>
          &#xA9; {new Date().getFullYear()}. Designed by &nbsp;
          <Link href='https://arun99.dev' isExternal fontWeight='600'>Arun</Link>
          &nbsp; &#38; &nbsp;
          <Link href='https://jana19.dev' isExternal fontWeight='600'>Jana</Link>.
        </Text>
        <Text fontSize='.6rem' pb='1rem'>
          Need Help?
          <Link onClick={() => onOpen}> Contact Us</Link>
        </Text>
      </Flex>
    </>
  )
}

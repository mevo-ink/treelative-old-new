import { Flex } from '@chakra-ui/react'

const InnerWrapper = ({ children }) => (
  <Flex
    w='85%'
    minH='75%'
    mt='3.5rem'
    background='hsla(0, 0%, 100%, .6)'
    borderRadius='20px'
    display='flex'
    flexDir='column'
    alignItems='center'
    boxShadow='0 0 0 100vw hsla(0, 0%, 0%, .25)'
  >
    {children}
  </Flex>
)

export default InnerWrapper

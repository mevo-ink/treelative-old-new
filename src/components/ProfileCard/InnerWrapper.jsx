import { Flex } from '@chakra-ui/react'

const InnerWrapper = ({ children }) => {
  return (
    <Flex
      w='85%'
      m='2rem 0'
      mt='4.3rem'
      background='hsla(0, 0%, 100%, .6)'
      borderRadius='20px'
      display='flex'
      flexDir='column'
      alignItems='center'
      position='relative'
      boxShadow='0 0 0 100vw hsla(0, 0%, 0%, .25)'
    >
      {children}
    </Flex>
  )
}

export default InnerWrapper

import { Flex } from '@chakra-ui/react'

import { useRecoilState } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

const InnerWrapper = ({ children }) => {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)
  return (
    <Flex
      w='85%'
      m='2rem 0'
      mt='5.5rem'
      background='hsla(0, 0%, 100%, .6)'
      borderRadius='20px'
      display='flex'
      flexDir='column'
      alignItems='center'
      position='relative'
      boxShadow='0 0 0 100vw hsla(0, 0%, 0%, .25)'
      onClick={() => isEditMode && setIsEditMode(false)}
    >
      {children}
    </Flex>
  )
}

export default InnerWrapper

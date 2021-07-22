import {
  Box,
  Text,
  Flex,
  Image,
  Button
} from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'

import { activeNodeIDAtom } from 'utils/atoms.js'

export default function SearchResult ({ user, onClose }) {
  console.log(user)
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)
  const handleClick = (id) => {
    setActiveNodeID(id)
    onClose()
  }
  return (
    <Button
      w='100%'
      h='auto'
      borderRadius='999px'
      p='.5em .6em'
      bg='hsla(0, 0%, 100%, .2)'
      onClick={handleClick}
    >
      <Flex w='100%' alignItems='center'>
        <Image
          src='https://aui.atlassian.com/aui/8.6/docs/images/avatar-person.svg'
          alt='user-avatar'
          w='30px'
          objectFit='contain'
        />
        <Box w='80%' ml='.5rem' textAlign='left'>
          <Text
            w='100%'
            fontSize='1rem'
            fontWeight='100'
            cursor='pointer'
            wordBreak='break-word'
            whiteSpace='normal'
          >
            Arun Mathiyalakan
          </Text>
          <Flex mt='.3rem'>
            <Text fontSize='.5rem' fontWeight='100'> 21/11/1999 </Text>
            <Text ml='.3rem' fontSize='.5rem' fontWeight='100'> Italy </Text>
          </Flex>
        </Box>
      </Flex>
    </Button>
  )
}

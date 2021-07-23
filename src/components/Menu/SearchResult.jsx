import {
  Box,
  Text,
  Flex,
  Image,
  Button
} from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'

import { format } from 'date-fns'

import { activeNodeIDAtom } from 'utils/atoms.js'

export default function SearchResult ({ users, onClose, isFetching }) {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)
  const handleClick = (id) => {
    setActiveNodeID(id)
    onClose()
  }

  const handleDateOfBirth = (dateOfBirth) => {
    const dt = new Date(dateOfBirth)
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
    return format(dtDateOnly, 'PP').replace(/[, ]+/g, '/')
  }
  return (
    users.map(user => (
      <Button
        key={user.id}
        w='100%'
        h='auto'
        borderRadius='999px'
        p='.5em .6em'
        bg='hsla(0, 0%, 100%, .2)'
        onClick={() => handleClick(user.id)}
        isLoading={isFetching}
      >
        <Flex w='100%' alignItems='center'>
          <Image
            src={user.avatar}
            alt='user-avatar'
            w='30px'
            objectFit='contain'
            borderRadius='50%'
            fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
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
              {user.fullName}
            </Text>
            <Flex mt='.3rem'>
              <Text mr='.3rem' fontSize='.5rem' fontWeight='100'> {user.dateOfBirth && handleDateOfBirth(user.dateOfBirth)} </Text>
              <Text fontSize='.5rem' fontWeight='100'> {user.currentLocation && user.currentLocation.suggested.terms.slice(-1).map(val => val.value).join(', ')} </Text>
            </Flex>
          </Box>
        </Flex>
      </Button>
    ))
  )
}

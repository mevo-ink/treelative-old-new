import { useRouter } from 'next/router'

import { format } from 'date-fns'

import { useQuery } from 'react-query'

import Loading from 'components/_common/Loading'

import {
  Box,
  Text,
  Stack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody
} from '@chakra-ui/react'

export default function UsersMoreInfo ({ queryFn, variables, onClose, title }) {
  const router = useRouter()

  const { data, isLoading } = useQuery([title, variables], queryFn)

  const handleDate = (date) => {
    const dt = new Date(date)
    const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)
    return format(dtDateOnly, 'PP').replace(/[, ]+/g, '/')
  }

  return (
    <Modal isOpen isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
          <Box as='span' ml='2' fontSize='md'>({data?.length})</Box>
        </ModalHeader>
        <ModalBody
          maxH='300px'
          overflowY='auto'
          mr='20px'
          sx={{
            '::-webkit-scrollbar': { width: '2px' },
            '::-webkit-scrollbar-thumb': { background: 'hsla(0, 0%, 100%, 1)' }
          }}
        >
          {isLoading && <Loading />}
          {data && (
            <Stack>
              {data.map(user => (
                <HStack key={user.id} position='relative'>
                  <Box
                    w='35px'
                    h='35px'
                    m='.5rem'
                    borderRadius='50%'
                    backgroundImage={user.avatar}
                    backgroundSize='100% auto'
                    backgroundPosition='center'
                    onClick={() => router.push(`?userID=${user.id}`, `/users/${user.id}`, { shallow: true, scroll: false })}
                  />
                  <Box>
                    <Text>{user.fullName}</Text>
                    <Text fontSize='.8rem'>{user.age && handleDate(user.dateOfBirth)}</Text>
                    <Text fontSize='.6rem'>{user.currentLocation && user.currentLocation.description}</Text>
                  </Box>
                  {user.age && (
                    <Text
                      w='18px'
                      h='18px'
                      display='grid'
                      placeItems='center'
                      position='absolute'
                      top='0'
                      left='23px'
                      fontSize='10px'
                      bg='hsla(310, 100%, 40%, 1)'
                      borderRadius='50%'
                      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .8)'
                    >
                      {user.age}
                    </Text>
                  )}
                </HStack>
              ))}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

import { useRouter } from 'next/router'

import { useQuery, useMutation } from 'react-query'
import { getUnverifiedUsers } from 'graphql/client/queries/users'
import { verifyUser } from 'graphql/client/mutations/auth'

import Loading from 'components/_common/Loading'

import {
  Box,
  Text,
  Grid,
  Stack,
  Modal,
  HStack,
  Button,
  ModalBody,
  IconButton,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure
} from '@chakra-ui/react'

import { MdDone, MdClose } from 'react-icons/md'

export default function UnverifiedUsers () {
  const router = useRouter()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { data, isLoading, refetch } = useQuery('getUnverifiedUsers', getUnverifiedUsers)

  const { mutate, isLoading: isVerifying } = useMutation(verifyUser)

  const handleVerify = (isVerified, userID) => {
    mutate({ userID, isVerified }, { onSuccess: refetch })
  }

  if (data?.length === 0) return null

  return (
    <>
      <Grid
        as={Button}
        bg='hsla(0, 100%, 50%, .5)'
        borderRadius='10px'
        p='.5em'
        mr='.5rem'
        w='4rem'
        h='4rem'
        _hover={{ border: '1px solid white' }}
        onClick={onOpen}
      >
        <Text fontSize='10px'>Unverified</Text>
        <Text fontSize='25px' fontWeight='600'>{data?.length}</Text>
      </Grid>
      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent w='100%'>
          <ModalHeader>
            Unverified Users
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
                  <HStack key={user.id} justifyContent='space-between'>
                    <HStack>
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
                        <Text fontSize='.8rem'>{user.email || user.phoneNumber}</Text>
                      </Box>
                    </HStack>
                    <HStack>
                      <IconButton
                        size='sm'
                        icon={<MdClose size='1.2rem' />}
                        aria-label='Cancel'
                        isRound
                        bg='hsla(358, 75%, 50%, 1)'
                        onClick={() => handleVerify(false, user.id)}
                        isLoading={isVerifying}
                      />
                      <IconButton
                        size='sm'
                        icon={<MdDone size='1.2rem' />}
                        aria-label='Confirm'
                        isRound
                        bg='hsla(120, 75%, 50%, 1)'
                        onClick={() => handleVerify(true, user.id)}
                        isLoading={isVerifying}
                        ml={6}
                      />
                    </HStack>
                  </HStack>
                ))}
              </Stack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

import { useRouter } from 'next/router'

import { useState } from 'react'

import { useQuery, useMutation } from 'react-query'
import { getContactUsers } from 'graphql/client/queries/users'
import { searchNewUsers } from 'graphql/client/queries/search'

import { connectUserEmail } from 'graphql/client/mutations/auth'
import { firebaseAuth } from 'utils/firebaseApp'

import {
  Box,
  Grid,
  Flex,
  Text,
  Modal,
  Stack,
  Image,
  ModalBody,
  IconButton,
  ModalFooter,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import Loading from 'components/_common/Loading'
import UserSelection from 'components/_common/UserSelection'
import ErrorModal from 'components/_common/ErrorModal'
import CreateUser from 'components/Menu/UserOptions/CreateUser'

export default function ConnectUserEmail ({ email, message, onClose }) {
  const router = useRouter()

  const { data } = useQuery('getContactUsers', getContactUsers)

  const [isAddNewOpen, setIsAddNewOpen] = useState('')

  const { mutate, data: successData, isLoading, error } = useMutation(connectUserEmail)

  const handleCreateUserClose = async (userID) => {
    setIsAddNewOpen('')
    if (userID) {
      await handleConnectUserEmail(userID)
    }
  }

  const handleConnectUserEmail = async (userID) => {
    const token = await firebaseAuth.currentUser.getIdToken()
    mutate({ userID, email, token })
  }

  const handleOnChange = async userRelation => {
    if (userRelation.__isNew__) {
      // show create new user dialog
      setIsAddNewOpen(userRelation.value)
    } else {
      const userID = userRelation.value
      handleConnectUserEmail(userID)
    }
  }

  if (error) return <ErrorModal onClose={onClose}> {error.message} </ErrorModal>

  return (
    <>
      {isAddNewOpen && <CreateUser initialValue={isAddNewOpen} onClose={handleCreateUserClose} />}
      <Modal isOpen isCentered scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent bg='transparent'>
          <IconButton
            size='2rem'
            icon={<MdClose size='1.5rem' />}
            position='absolute'
            zIndex='1'
            right='1rem'
            top='1rem'
            borderRadius='5px'
            bg='transparent'
            onClick={onClose}
          />
          <ModalBody as={Grid} placeItems='center' p='2em' mt='1rem'>
            {!successData && (
              <Stack minH='500'>
                {isLoading && <Loading />}
                <Text
                  w='100%'
                  p='1em'
                  textAlign='center'
                  borderRadius='10px'
                  bg='hsla(0, 100%, 70%, .3)'
                >
                  {message}
                </Text>
                <Text
                  w='100%'
                  p='1em'
                  textAlign='center'
                  borderRadius='10px'
                >
                  Please select an existing user to connect with this email
                </Text>
                <UserSelection
                  query={searchNewUsers}
                  onChange={handleOnChange}
                  placeholder='Search User'
                />
              </Stack>
            )}
            {successData && (
              <Stack>
                <Text
                  w='100%'
                  p='1em'
                  textAlign='center'
                  borderRadius='10px'
                  bg='hsla(150, 100%, 70%, .3)'
                >
                  Thank you for requesting to connect your email with <br /><strong>{successData.fullName}</strong>. <br /><br />
                  We will verify the email and notify you once it has been approved.
                </Text>
              </Stack>
            )}
          </ModalBody>
          <ModalFooter d='flex' flexDir='column'>
            <Text textAlign='center' fontSize='.8rem' mb='1.5'>
              Please contact us for further assistance
            </Text>
            <Flex justifyContent='space-between' w='40%'>
              {data && data.map(user => (
                <Box key={user.id}>
                  <Image
                    src={user.avatar}
                    w='3rem'
                    borderRadius='50%'
                    onClick={() => router.push(`?userID=${user.id}`, `/users/${user.id}`, { shallow: true, scroll: false })}
                  />
                  <Text fontSize='sm' mt='.5rem' textAlign='center'>{user.shortName}</Text>
                </Box>
              ))}
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

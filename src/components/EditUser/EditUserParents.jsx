import { useState } from 'react'

import {
  Box,
  Text,
  Modal,
  Stack,
  Flex,
  Alert,
  Image,
  Button,
  ModalBody,
  AlertIcon,
  IconButton,
  ModalHeader,
  FormControl,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  AlertDescription,
  createStandaloneToast
} from '@chakra-ui/react'

import { MdAdd } from 'react-icons/md'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  isEditModeAtom,
  activeNodeIDAtom,
  layoutAtom,
  networkMethodsAtom
} from 'utils/atoms.js'

import { useMutation } from 'urql'
import { LIST_USER_AVAILABLE_PARENTS } from 'graphql/queries/users'
import { ADD_USER_PARENT, DELETE_USER_PARENT } from 'graphql/mutations/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'
import UserSelection from 'components/_common/UserSelection'

import CreateUser from 'components/Menu/CreateUser'
import DeleteUserRelation from 'components/EditUser/DeleteUserRelation'

const toast = createStandaloneToast()

export default function EditUserParents (props) {
  const layout = useRecoilValue(layoutAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)

  const [removeParentResult, removeParent] = useMutation(DELETE_USER_PARENT)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleRemoveParent = (parentID, shortName) => {
    const variables = { userID: props.user.id, parentID }
    removeParent(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully removed the parent',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
          layout === 'network' && networkMethods.refetch()
        }
      })
  }

  const handleUserSelect = (userID) => {
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  return (
    <>
      {isOpen && <EditUserParentsModal user={props.user} onClose={onClose} />}
      <Flex w='85%' flexWrap='wrap' justifyContent='center'>
        {props.user.parents.map(parent => (
          <Box key={parent.id}>
            <Box
              w={props.user.children.length !== 0 ? '2.5rem' : '3rem'}
              h={props.user.children.length !== 0 ? '2.5rem' : '3rem'}
              p='0'
              m='0 .2rem'
              cursor='pointer'
              mt='1rem'
              position='relative'
            >
              {isEditMode && (
                <DeleteUserRelation
                  title='Remove Parent'
                  onRemove={() => handleRemoveParent(parent.id, parent.shortName)}
                  isLoading={removeParentResult.fetching}
                />
              )}
              <Button
                w='100%'
                h='100%'
                p='0'
                borderRadius='50%'
                isDisabled={isEditMode}
              >
                <Image
                  src={parent.avatar}
                  alt='parent-avatar'
                  w='100%'
                  h='100%'
                  borderRadius='50%'
                  fallbackSrc={`https://ui-avatars.com/api/?name=${parent.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                  onClick={() => handleUserSelect(parent.id)}
                />
              </Button>
            </Box>
            <Text variant='info-title' fontSize='.65rem' mt='.2rem' textAlign='center'>{parent.shortName}</Text>
          </Box>
        ))}
        {isEditMode && props.user.parents.length < 2 && (
          <IconButton
            icon={<MdAdd size='2rem' />}
            w='2rem'
            objectFit='contain'
            p='0'
            m='0 .2rem'
            mt='1rem'
            cursor='pointer'
            borderRadius='50%'
            color='hsla(261, 64%, 18%, 1)'
            background='hsla(0, 0%, 100%, .2)'
            boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
            onClick={onOpen}
          />
        )}
      </Flex>
    </>
  )
}

function EditUserParentsModal ({ user, onClose, isRefetching }) {
  const layout = useRecoilValue(layoutAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)

  const [isAddNewOpen, setIsAddNewOpen] = useState('')

  const [result, addUserParent] = useMutation(ADD_USER_PARENT)

  const handleOnChange = userParent => {
    if (userParent.__isNew__) {
      // show create new user dialog
      setIsAddNewOpen(userParent.value)
    } else {
      const variables = { userID: user.id, parentID: userParent.value }
      addUserParent(variables)
        .then(result => {
          if (result.data) {
            toast({
              title: 'Successfully added the parent',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
            layout === 'network' && networkMethods.refetch()
            onClose()
          }
        })
    }
  }

  const handleCreateUserClose = (response) => {
    setIsAddNewOpen('')
    if (response) {
      const variables = { userID: user.id, parentID: response.addUser.id }
      addUserParent(variables)
        .then(result => {
          if (result.data) {
            toast({
              title: 'Successfully added the child',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
            layout === 'network' && networkMethods.refetch()
            onClose()
          }
        })
    }
  }

  return (
    <>
      {isAddNewOpen && <CreateUser initialValue={isAddNewOpen} onClose={handleCreateUserClose} />}
      <Modal isOpen isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH='30rem'>
          <ModalHeader>
            Add Parent
          </ModalHeader>
          <ModalCloseButton isDisabled={result.fetching} />
          <ModalBody as='form' p='1em 1.6em'>
            <Stack spacing='8'>
              <FormControl>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Stack flex='1'>
                    <UserSelection
                      query={LIST_USER_AVAILABLE_PARENTS}
                      variables={{ userID: user.id }}
                      key={`parent_key__${JSON.stringify(user.parent ? { label: user.parent.fullName, value: user.parent.id } : undefined)}`}
                      value={user.parent ? { label: user.parent.fullName, value: user.parent.id } : undefined}
                      onChange={handleOnChange}
                      placeholder='Search Parent'
                      filterUsers={({ value }) => value !== user.id}
                    />
                  </Stack>
                </Stack>
              </FormControl>
              {(result.fetching || isRefetching) && <Loading />}
              {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Alert status='warning' borderRadius='lg'>
              <AlertIcon />
              <AlertDescription>
                {!user.parent && 'A parent\'s partner will automatically be added as the second parent'}
              </AlertDescription>
            </Alert>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

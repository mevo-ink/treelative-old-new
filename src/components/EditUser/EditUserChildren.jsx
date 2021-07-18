import {
  Box,
  Text,
  Modal,
  Stack,
  Flex,
  Image,
  Button,
  keyframes,
  ModalBody,
  IconButton,
  ModalHeader,
  FormControl,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  createStandaloneToast
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'

import { useMutation } from 'urql'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isEditModeAtom, activeNodeIDAtom } from 'utils/atoms.js'
import { LIST_USER_AVAILABLE_CHILDREN } from 'graphql/queries/users'
import { ADD_USER_CHILD, DELETE_USER_CHILD } from 'graphql/mutations/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'
import UserSelection from 'components/_common/UserSelection'

const toast = createStandaloneToast()

export default function EditUserChildren (props) {
  const [removeChildResult, removeUserChild] = useMutation(DELETE_USER_CHILD)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-2deg); }
    100% { transform: rotate(2deg); }
  `

  const handleRemoveChild = (childID, shortName) => {
    const variables = { userID: props.user.id, childID }
    if (window.confirm(`Are you sure want to remove ${shortName}?`)) {
      removeUserChild(variables)
        .then(result => {
          if (result.data) {
            toast({
              title: 'Successfully removed the child',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
          }
        })
    }
  }

  return (
    <>
      {isOpen && <AddUserChildModal user={props.user} onClose={onClose} />}
      <Flex w='85%' flexWrap='wrap' justifyContent='center'>
        {props.user.children.map(child => (
          <Box key={child.id}>
            <Box
              w='2.5rem'
              h='2.5rem'
              p='0'
              m='0 .2rem'
              cursor='pointer'
              mt='1rem'
              position='relative'
            >
              {isEditMode && (
                <IconButton
                  icon={<BiTrash size='25px' />}
                  w='100%'
                  h='100%'
                  color='red'
                  position='absolute'
                  zIndex='1'
                  bg='hsla(0, 0%, 0%, .8)'
                  borderRadius='50%'
                  boxShadow='0px 3px 5px hsla(0, 0%, 0%, .3)'
                  animation={`${wiggle} infinite .15s linear`}
                  onClick={() => handleRemoveChild(child.id, child.shortName)}
                  isLoading={removeChildResult.fetching}
                />
              )}
              <Button
                p='0'
                borderRadius='50%'
                isDisabled={isEditMode}
              >
                <Image
                  src={child.avatar}
                  alt='child-avatar'
                  borderRadius='50%'
                  fallbackSrc={`https://ui-avatars.com/api/?name=${child.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                  onClick={() => setActiveNodeID(child.id)}
                />
              </Button>
            </Box>
            <Text variant='info-title' fontSize='.65rem' mt='.2rem' textAlign='center'>{child.shortName}</Text>
          </Box>
        ))}
        {props.user.children.length === 0 && !isEditMode && <Text variant='info'>Unavailable</Text>}
        {isEditMode && (
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

function AddUserChildModal ({ user, onClose, isRefetching }) {
  const [result, addUserChild] = useMutation(ADD_USER_CHILD)

  const handleOnChange = userChild => {
    const variables = { userID: user.id, childID: userChild.value }
    addUserChild(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully added the child',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
          onClose()
        }
      })
  }

  return (
    <Modal isOpen isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Add Child
        </ModalHeader>
        <ModalCloseButton isDisabled={result.fetching} />
        <ModalBody as='form' p='1em 1.6em'>
          <Stack spacing='8'>
            <FormControl>
              <Stack direction='row' justifyContent='space-between' alignItems='center'>
                <Stack flex='1'>
                  <UserSelection
                    query={LIST_USER_AVAILABLE_CHILDREN}
                    variables={{ userID: user.id }}
                    key={`child_key__${JSON.stringify(user.children ? { label: user.children.fullName, value: user.children.id } : undefined)}`}
                    value={user.child ? { label: user.children.fullName, value: user.children.id } : undefined}
                    onChange={handleOnChange}
                    placeholder='Search Child'
                    filterUsers={({ value }) => value !== user.id}
                  />
                </Stack>
              </Stack>
            </FormControl>
            {(result.fetching || isRefetching) && <Loading />}
            {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

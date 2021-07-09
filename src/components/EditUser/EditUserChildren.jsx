import UserSelection from 'components/_common/UserSelection'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import { useMutation } from 'urql'
import { ADD_USER_CHILD, DELETE_USER_CHILD } from 'graphql/mutations/users'

import { LIST_USER_AVAILABLE_CHILDREN } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
  Text,
  Wrap,
  Modal,
  Stack,
  Avatar,
  Button,
  WrapItem,
  ModalBody,
  FormLabel,
  ModalHeader,
  FormControl,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  createStandaloneToast
} from '@chakra-ui/react'

import { BiEdit } from 'react-icons/bi'

const toast = createStandaloneToast()

export default function EditUserChildrenTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { children } = props.user

  const childrenRender = (
    <Wrap justify='center'>
      {children.map(child => (
        <WrapItem key={child.id}>
          <Avatar size='sm' name={child.fullName} src={child.avatar} />
        </WrapItem>
      ))}
      {children.length === 0 && <Text>N/A</Text>}
    </Wrap>
  )

  if (!isEditMode) {
    return childrenRender
  }

  return (
    <>
      {isOpen && <EditUserChildrenDialog {...props} onClose={onClose} />}
      <Button isFullWidth onClick={onOpen} size='sm' rightIcon={<BiEdit />} variant='outline' whiteSpace='normal' height='100%' wordBreak='break-all'>
        {childrenRender}
      </Button>
    </>
  )
}

function EditUserChildrenInline ({ user, refetch, isRefetching }) {
  const [result, addUserChild] = useMutation(ADD_USER_CHILD)

  const [removeUserChildResult, removeUserChild] = useMutation(DELETE_USER_CHILD)

  const handleOnChange = userChildren => {
    const existingChildren = user.children.map(({ id }) => id)
    let action, value
    if (!userChildren) {
      action = 'unlink'
      value = existingChildren[0]
    } else {
      const updatedValues = userChildren.map(({ value }) => value)
      const unlinkedValue = existingChildren
        .filter(value => !updatedValues.includes(value))[0]
      const linkedValue = updatedValues
        .filter(value => !existingChildren.includes(value))[0]
      action = unlinkedValue ? 'unlink' : 'link'
      value = unlinkedValue || linkedValue
    }
    if (action === 'link') {
      addUserChild({ userID: user.id, childID: value })
        .then(result => {
          if (result.data) {
            refetch()
            toast({
              title: 'Successfully added the child',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
          }
        })
    } else {
      removeUserChild({ userID: user.id, childID: value })
        .then(result => {
          if (result.data) {
            refetch()
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
    <Stack spacing='8'>
      <FormControl>
        <FormLabel>Children</FormLabel>
        <UserSelection
          autoFocus
          isMulti
          isDisabled={result.fetching || isRefetching || removeUserChildResult.fetching}
          isClearable={false}
          query={LIST_USER_AVAILABLE_CHILDREN}
          variables={{ userID: user.id }}
          key={`children_key__${JSON.stringify(user?.children?.length > 0 ? user?.children.map(child => ({ label: child?.fullName, value: child?.id })) : undefined)}`}
          value={user?.children ? user?.children.map(child => ({ label: child?.fullName, value: child?.id })) : undefined}
          onChange={handleOnChange}
          placeholder='Search Children'
        />
      </FormControl>
      {(result.fetching || isRefetching) && <Loading />}
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
      {removeUserChildResult.fetching && <Loading />}
      {removeUserChildResult.error && <ErrorAlert> {removeUserChildResult.error.message} </ErrorAlert>}
    </Stack>
  )
}

export function EditUserChildrenDialog ({ user, refetch, isRefetching, onClose }) {
  return (
    <Modal isOpen isCentered onClose={onClose} size='md' closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent pb='2' minH='500px'>
        <ModalHeader>
          Edit Children
          <Text fontSize='xs'>{user.fullName}</Text>
        </ModalHeader>
        <ModalCloseButton isDisabled={isRefetching} />
        <ModalBody pb='4'>
          <EditUserChildrenInline user={user} refetch={refetch} isRefetching={isRefetching} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

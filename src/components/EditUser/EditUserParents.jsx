import UserSelection from 'components/_common/UserSelection'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import { useMutation } from 'urql'
import { ADD_USER_PARENT, DELETE_USER_PARENT } from 'graphql/mutations/users'
import { LIST_USER_AVAILABLE_PARENTS } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
  Text,
  Modal,
  Stack,
  Flex,
  Icon,
  Alert,
  Image,
  Button,
  keyframes,
  FormLabel,
  ModalBody,
  AlertIcon,
  IconButton,
  ModalHeader,
  FormControl,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  AlertDescription,
  createStandaloneToast
} from '@chakra-ui/react'

import { MdAdd } from 'react-icons/md'
import { BiTrash } from 'react-icons/bi'

const toast = createStandaloneToast()

export default function EditUserParentsTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { parents } = props.user

  const shake = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-2deg); }
    100% { transform: rotate(2deg); }
  `

  return (
    <>
      {isOpen && <EditUserParentsDialog {...props} onClose={onClose} />}
      <Flex w='85%' flexWrap='wrap' justifyContent='center'>
        {parents.map(parent => (
          <Button
            key={parent.id}
            w='2rem'
            h='auto'
            p='0'
            m='0 .2rem'
            cursor='pointer'
            mt='1rem'
            borderRadius='50%'
          >
            {isEditMode && (
              <Icon
                as={BiTrash}
                w='100%'
                h='100%'
                p='.6em 0'
                color='red'
                position='absolute'
                bg='hsla(0, 0%, 0%, .8)'
                borderRadius='50%'
                boxShadow='0px 3px 5px hsla(0, 0%, 0%, .3)'
                animation={`${shake} infinite .15s linear`}
              />
            )}
            <Image
              src={parent.avatar}
              alt='parent-avatar'
              objectFit='contain'
              borderRadius='50%'
              fallbackSrc={`https://ui-avatars.com/api/?name=${parent.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
            />
          </Button>
        ))}
        {parents.length === 0 && !isEditMode && <Text variant='info'>Unavailable</Text>}
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

function EditUserParents ({ user, refetch, isRefetching }) {
  const [result, addUserParent] = useMutation(ADD_USER_PARENT)

  const [removeParentOneResult, removeUserParentOne] = useMutation(DELETE_USER_PARENT)
  const [removeParentTwoResult, removeUserParentTwo] = useMutation(DELETE_USER_PARENT)

  const handleOnChange = userParent => {
    const variables = { userID: user.id, parentID: userParent.value }
    addUserParent(variables)
      .then(result => {
        if (result.data) {
          refetch()
          toast({
            title: 'Successfully updated the parent',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  const handleRemoveParentOne = parentID => {
    const variables = { userID: user.id, parentID }
    removeUserParentOne(variables)
      .then(result => {
        if (result.data) {
          refetch()
          toast({
            title: 'Successfully removed the parent',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  const handleRemoveParentTwo = parentID => {
    const variables = { userID: user.id, parentID }
    removeUserParentTwo(variables)
      .then(result => {
        if (result.data) {
          refetch()
          toast({
            title: 'Successfully removed the parent',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  const [parentOne, parentTwo] = user?.parents || []

  return (
    <Stack spacing='8'>
      <FormControl>
        <FormLabel>Parent One</FormLabel>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack flex='1'>
            <UserSelection
              query={LIST_USER_AVAILABLE_PARENTS}
              variables={{ userID: user.id }}
              isDisabled={result.fetching || isRefetching || removeParentOneResult.fetching}
              key={`parentOne_key__${JSON.stringify(parentOne ? { label: parentOne.fullName, value: parentOne.id } : undefined)}`}
              value={parentOne ? { label: parentOne.fullName, value: parentOne.id } : undefined}
              onChange={handleOnChange}
              placeholder='Search Parent One'
              filterUsers={({ value }) => value !== user.id}
            />
          </Stack>
          <IconButton
            colorScheme='red'
            variant='outline'
            aria-label='Remove Parent One'
            fontSize='20px'
            icon={<BiTrash />}
            onClick={() => handleRemoveParentOne(parentOne.id)}
            isLoading={removeParentOneResult.fetching}
            isDisabled={!parentOne}
          />
        </Stack>

      </FormControl>
      <FormControl>
        <FormLabel>Parent Two</FormLabel>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Stack flex='1'>
            <UserSelection
              menuPlacement='top'
              query={LIST_USER_AVAILABLE_PARENTS}
              variables={{ userID: user.id }}
              isDisabled={!parentOne || result.fetching || isRefetching || removeParentTwoResult.fetching}
              key={`parentTwo_key__${JSON.stringify(parentTwo ? { label: parentTwo.fullName, value: parentTwo.id } : undefined)}`}
              value={parentTwo ? { label: parentTwo.fullName, value: parentTwo.id } : undefined}
              onChange={handleOnChange}
              placeholder='Search Parent Two'
              filterUsers={({ value }) => value !== user.id}
            />
          </Stack>
          <IconButton
            colorScheme='red'
            variant='outline'
            aria-label='Remove Parent Two'
            fontSize='20px'
            icon={<BiTrash />}
            onClick={() => handleRemoveParentTwo(parentTwo.id)}
            isLoading={removeParentTwoResult.fetching}
            isDisabled={!parentTwo}
          />
        </Stack>
      </FormControl>
      {(result.fetching || isRefetching) && <Loading />}
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
      <Alert status='warning' borderRadius='lg'>
        <AlertIcon />
        <AlertDescription>
          {!parentOne && 'A parent\'s partner will automatically be added as the second parent'}
          {parentOne && 'Selecting a new parent will automatically add his/her partner as the second parent'}
        </AlertDescription>
      </Alert>
    </Stack>
  )
}

function EditUserParentsDialog ({ user, refetch, isRefetching, onClose }) {
  return (
    <Modal isOpen isCentered onClose={onClose} size='md' scrollBehavior='inside' closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent pb='2' minH='400px'>
        <ModalHeader>
          Edit Parents
          <Text fontSize='xs'>{user.fullName}</Text>
        </ModalHeader>
        <ModalCloseButton isDisabled={isRefetching} />
        <ModalBody pb='4'>
          <EditUserParents user={user} refetch={refetch} isRefetching={isRefetching} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

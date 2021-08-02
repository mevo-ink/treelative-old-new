import { useState } from 'react'

import {
  Modal,
  Stack,
  Alert,
  ModalBody,
  AlertIcon,
  ModalHeader,
  FormControl,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  AlertDescription,
  createStandaloneToast
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { layoutAtom, networkMethodsAtom } from 'utils/atoms.js'

import Loading from 'components/_common/Loading'
import CreateUser from 'components/Menu/CreateUser'
import ErrorAlert from 'components/_common/ErrorAlert'
import UserSelection from 'components/_common/UserSelection'

const toast = createStandaloneToast()

export default function EditableAvatarModal (props) {
  const {
    user,
    title,
    onClose,
    addRelation,
    addRelationResult,
    LIST_AVAILABLE_RELATIONS
  } = props

  const [isAddNewOpen, setIsAddNewOpen] = useState('')

  const layout = useRecoilValue(layoutAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)

  const handleAddRelation = (userID) => {
    addRelation(userID)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully Added Relation',
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

  const handleCreateUserClose = (response) => {
    setIsAddNewOpen('')
    if (response) {
      handleAddRelation(response.addUser.id)
    }
  }

  const handleOnChange = userRelation => {
    if (userRelation.__isNew__) {
      // show create new user dialog
      setIsAddNewOpen(userRelation.value)
    } else {
      handleAddRelation(userRelation.value)
    }
  }
  return (
    <>
      {isAddNewOpen && <CreateUser initialValue={isAddNewOpen} onClose={handleCreateUserClose} />}
      <Modal isOpen isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH={title === 'Add Parent' ? '27rem' : '23rem'}>
          <ModalHeader>
            {title}
          </ModalHeader>
          <ModalCloseButton isDisabled={addRelationResult.fetching} />
          <ModalBody as='form' p='1em 1.6em'>
            <Stack spacing='8'>
              <FormControl>
                <Stack direction='row' justifyContent='space-between' alignItems='center'>
                  <Stack flex='1'>
                    <UserSelection
                      query={LIST_AVAILABLE_RELATIONS}
                      variables={{ userID: user.id }}
                      onChange={handleOnChange}
                      placeholder='Search User'
                      filterUsers={({ value }) => value !== user.id}
                    />
                  </Stack>
                </Stack>
              </FormControl>
              {(addRelationResult.fetching) && <Loading />}
              {addRelationResult.error && <ErrorAlert> {addRelationResult.error.message} </ErrorAlert>}
            </Stack>
          </ModalBody>
          {title === 'Add Parent' && (
            <ModalFooter>
              <Alert status='warning' borderRadius='lg'>
                <AlertIcon />
                <AlertDescription>
                  Parent's partner will automatically be added as your second parent
                </AlertDescription>
              </Alert>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

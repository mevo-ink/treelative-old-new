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

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'
import UserSelection from 'components/_common/UserSelection'
import CreateUser from 'components/Menu/UserOptions/CreateUser'

const toast = createStandaloneToast()

export default function RelationModal (props) {
  const {
    user,
    title,
    onClose,
    addRelation,
    addRelationResult,
    SUGGEST_RELATIONS
  } = props

  const [isAddNewOpen, setIsAddNewOpen] = useState('')

  const handleAddRelation = (userID) => {
    addRelation(userID)
      .then(() => {
        toast({
          title: 'Successfully Added Relation',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true
        })
        onClose()
      })
  }

  const handleCreateUserClose = (userID) => {
    setIsAddNewOpen('')
    if (userID) {
      handleAddRelation(userID)
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
                      query={SUGGEST_RELATIONS}
                      variables={{ userID: user.id }}
                      onChange={handleOnChange}
                      placeholder='Search User'
                      filterUsers={({ value }) => value !== user.id}
                    />
                  </Stack>
                </Stack>
              </FormControl>
              {(addRelationResult.isLoading) && <Loading />}
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

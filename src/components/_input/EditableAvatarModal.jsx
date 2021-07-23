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
    relations,
    addRelation,
    addRelationResult,
    LIST_USER_AVAILABLE_RELATIONS
  } = props

  const [isAddNewOpen, setIsAddNewOpen] = useState('')

  const layout = useRecoilValue(layoutAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)

  const handleCreateUserClose = (response) => {
    setIsAddNewOpen('')
    if (response) {
      const variables = { userID: user.id, [title.toLowerCase().substring(4) + 'ID']: response.add.id }
      addRelation(variables)
        .then(result => {
          if (result.data) {
            toast({
              title: `Successfully added ${response.add.shortName}`,
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

  const handleOnChange = userRelation => {
    if (userRelation.__isNew__) {
      // show create new user dialog
      setIsAddNewOpen(userRelation.value)
    } else {
      const variables = { userID: user.id, [title.toLowerCase().substring(4) + 'ID']: userRelation.value }
      addRelation(variables)
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
  return (
    <>
      {isAddNewOpen && <CreateUser initialValue={isAddNewOpen} onClose={handleCreateUserClose} />}
      <Modal isOpen isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent minH='27rem'>
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
                      query={LIST_USER_AVAILABLE_RELATIONS}
                      variables={{ userID: user.id }}
                      key={`relation_key__${JSON.stringify(relations ? { label: relations.fullName, value: relations.id } : undefined)}`}
                      value={`Select ${title}`}
                      onChange={handleOnChange}
                      placeholder='Search Parent'
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

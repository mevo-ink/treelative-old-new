import UserSelection from 'components/_common/UserSelection'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import { useMutation } from 'urql'
import { ADD_COUPLE, DELETE_COUPLE } from 'graphql/mutations/couples'

import { LIST_USER_AVAILABLE_PARTNERS } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
  Text,
  Modal,
  Stack,
  Button,
  ModalBody,
  FormLabel,
  ModalHeader,
  ModalFooter,
  FormControl,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  createStandaloneToast
} from '@chakra-ui/react'

import { BiEdit } from 'react-icons/bi'

import EditCoupleDateOfMarriage from 'components/EditUser/partner/EditCoupleDateOfMarriage'
import EditCoupleMarriageLocation from 'components/EditUser/partner/EditCoupleMarriageLocation'

const toast = createStandaloneToast()

export default function EditUserPartnerTrigger ({ user, refetch, isRefetching }) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const partnerRender = <Text>{user?.couple?.partner?.fullName || 'N/A'}</Text>

  if (!isEditMode) {
    return partnerRender
  }

  return (
    <>
      {isOpen && <EditUserPartnerDialog user={user} refetch={refetch} isRefetching={isRefetching} onClose={onClose} />}
      <Button isFullWidth onClick={onOpen} size='sm' rightIcon={<BiEdit />} variant='outline' whiteSpace='normal' height='100%' wordBreak='break-all'>
        {partnerRender}
      </Button>
    </>
  )
}

function EditUserPartner ({ user, refetch, isRefetching }) {
  const [result, addCouple] = useMutation(ADD_COUPLE)

  const handleOnChange = userPartner => {
    const variables = { input: { userOneID: user.id, userTwoID: userPartner.value } }
    addCouple(variables)
      .then(result => {
        if (result.data) {
          refetch()
          toast({
            title: 'Successfully updated the partner',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  return (
    <Stack spacing='8'>
      <FormControl>
        <FormLabel>Partner</FormLabel>
        <UserSelection
          autoFocus
          isDisabled={result.fetching || user?.couple?.partner?.id}
          key={`partner_key__${JSON.stringify(user?.couple?.partner?.id ? { label: user?.couple?.partner?.fullName, value: user?.couple?.partner?.id } : undefined)}`}
          query={LIST_USER_AVAILABLE_PARTNERS}
          variables={{ userID: user.id }}
          value={user?.couple?.partner?.id ? { label: user?.couple?.partner?.fullName, value: user?.couple?.partner?.id } : undefined}
          onChange={handleOnChange}
          placeholder='Search a Partner'
        />
      </FormControl>
      {(result.fetching || isRefetching) && <Loading />}
      {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
      {user?.couple && (
        <>
          <EditCoupleDateOfMarriage inline couple={user?.couple} />
          <EditCoupleMarriageLocation inline couple={user?.couple} />
        </>
      )}
    </Stack>
  )
}

export function EditUserPartnerDialog ({ user, refetch, isRefetching, onClose }) {
  const [result, deleteCouple] = useMutation(DELETE_COUPLE)

  const handleRemovePartner = () => {
    const variables = { coupleID: user.couple.id }
    deleteCouple(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully removed the partner',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  return (
    <Modal isOpen isCentered onClose={onClose} size='sm' scrollBehavior='inside' closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent pb='2' minH='400px'>
        <ModalHeader>
          Edit Partner
          <Text fontSize='xs'>{user.fullName}</Text>
        </ModalHeader>
        <ModalCloseButton isDisabled={isRefetching} />
        <ModalBody pb='4'>
          <EditUserPartner user={user} refetch={refetch} isRefetching={isRefetching} />
        </ModalBody>
        {user?.couple?.partner?.id && (
          <ModalFooter>
            <Stack width='100%'>
              {result.error && <ErrorAlert> {result.error.message} </ErrorAlert>}
              <Button
                isFullWidth
                colorScheme='red'
                isLoading={result.fetching}
                onClick={handleRemovePartner}
              >
                Remove Partner
              </Button>
            </Stack>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

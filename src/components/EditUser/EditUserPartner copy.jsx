import {
  Box,
  Text,
  Modal,
  Stack,
  Flex,
  Image,
  Button,
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

import { useMutation } from 'urql'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isEditModeAtom, activeNodeIDAtom } from 'utils/atoms.js'
// import { ADD_COUPLE, DELETE_COUPLE } from 'graphql/mutations/couples'
import { LIST_USER_AVAILABLE_PARTNERS } from 'graphql/queries/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'
import UserSelection from 'components/_common/UserSelection'

// import DeleteUserRelation from 'components/EditUser/DeleteUserRelation'

const toast = createStandaloneToast()

export default function EditUserPartner (props) {
  // const [removePartnerResult, removePartner] = useMutation(DELETE_COUPLE)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  // const handleRemovePartner = () => {
  //   const variables = { coupleID: props.user.couple.id }
  //   removePartner(variables)
  //     .then(result => {
  //       if (result.data) {
  //         toast({
  //           title: 'Successfully removed the partner',
  //           status: 'success',
  //           position: 'top',
  //           duration: 3000,
  //           isClosable: true
  //         })
  //       }
  //     })
  //     .catch(err => console.log(err))
  // }

  const handleUserSelect = (userID) => {
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  return (
    <>
      {isOpen && <EditUserPartnerModal user={props.user} onClose={onClose} />}
      <Flex w='85%' flexWrap='wrap' justifyContent='center'>
        {props.user.couple && (
          <Box>
            <Box
              w='3rem'
              p='0'
              m='0 .2rem'
              cursor='pointer'
              mt='1rem'
              position='relative'
            >
              {/* {isEditMode && (
                <DeleteUserRelation
                  title='Remove Partner'
                  onRemove={handleRemovePartner}
                  isLoading={removePartnerResult.fetching}
                />
              )} */}
              <Button
                w='100%'
                h='100%'
                p='0'
                borderRadius='50%'
                isDisabled={isEditMode}
              >
                <Image
                  src={props.user.couple.partner.avatar}
                  alt='parent-avatar'
                  w='100%'
                  h='100%'
                  borderRadius='50%'
                  fallbackSrc={`https://ui-avatars.com/api/?name=${props.user.couple.partner.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                  onClick={() => handleUserSelect(props.user.couple.partner.id)}
                />
              </Button>
            </Box>
            <Text variant='info-title' fontSize='.65rem' mt='.2rem' textAlign='center'>
              {props.user.couple.partner.shortName}
            </Text>
          </Box>
        )}
        {isEditMode && !props.user.couple && (
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

export function EditUserPartnerModal ({ user, onClose, isRefetching }) {
  // const [result, addCouple] = useMutation(ADD_COUPLE)

  const handleOnChange = userPartner => {
    const variables = { input: { userOneID: user.id, userTwoID: userPartner.value } }
    addCouple(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully updated the partner',
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
      <ModalContent minH='25rem'>
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
                    autoFocus
                    isDisabled={result.fetching || user?.couple?.partner?.id}
                    key={`partner_key__${JSON.stringify(user?.couple?.partner?.id ? { label: user?.couple?.partner?.fullName, value: user?.couple?.partner?.id } : undefined)}`}
                    query={LIST_USER_AVAILABLE_PARTNERS}
                    variables={{ userID: user.id }}
                    value={user?.couple?.partner?.id ? { label: user?.couple?.partner?.fullName, value: user?.couple?.partner?.id } : undefined}
                    onChange={handleOnChange}
                    placeholder='Search a Partner'
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

import { useRecoilState, useRecoilValue } from 'recoil'
import {
  networkMethodsAtom,
  activeNodeIDAtom,
  isEditModeAtom
} from 'utils/atoms.js'

import { useQuery } from 'urql'
import { GET_USER } from 'graphql/queries/users'

import {
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'

import Loading from 'components/_common/Loading'
import Login from 'components/Login'
import SliderChumma from 'components/ProfileCardChumma/SliderChumma'

export default function ProfileCardChumma () {
  const networkMethods = useRecoilValue(networkMethodsAtom)
  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)

  const [result, refetch] = useQuery({ query: GET_USER, variables: { filter: { id: activeNodeID } } })

  const onClose = () => {
    setActiveNodeID(null)
    networkMethods.unselectAll()
  }

  const onLoginSuccess = () => {
    refetch({ requestPolicy: 'network-only' })
  }

  return (
    <Modal isOpen isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Button size='sm' variant={isEditMode ? 'solid' : 'outline'} onClick={() => setIsEditMode(!isEditMode)}>
            Toggle Edit Mode
          </Button>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {result.fetching && <Loading />}
          {result.error && <Login onSuccess={onLoginSuccess} />}
          {result.data && <SliderChumma user={result.data.getUser} />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

import { networkMethodsAtom, activeNodeIDAtom } from 'utils/atoms.js'
import { useRecoilState, useRecoilValue } from 'recoil'

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'

export default function ProfileCard () {
  const networkMethods = useRecoilValue(networkMethodsAtom)
  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)

  const onClose = () => {
    // clear the activeNodeID in store
    setActiveNodeID(null)
    // unselect all nodes
    networkMethods.unselectAll()
  }

  if (!activeNodeID) return null

  return (
    <Modal isOpen isCentered onClose={onClose} closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>ASDASD</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

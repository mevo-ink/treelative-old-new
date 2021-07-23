import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader
} from '@chakra-ui/react'

export default function InsightsModal ({ onClose, insight }) {
  return (
    <Modal isOpen isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{insight.title}</ModalHeader>
      </ModalContent>
    </Modal>
  )
}

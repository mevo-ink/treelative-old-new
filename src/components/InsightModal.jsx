import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody
} from '@chakra-ui/react'

import AgeInsight from 'components/Insights/AgeInsight'

export default function InsightsModal ({ onClose, insight }) {
  let InsightContent

  switch (insight.title) {
    case 'Age':
      InsightContent = AgeInsight
      break
    default:
      break
  }

  return (
    <Modal isOpen isCentered onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent h='500px' w='100%'>
        <ModalHeader>{insight.title}</ModalHeader>
        <ModalBody>
          {InsightContent && <InsightContent />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

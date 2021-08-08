import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody
} from '@chakra-ui/react'

import AgeInsight from 'components/Menu/Insights/AgeInsight'
import MembersInsight from 'components/Menu/Insights/MembersInsight'
import CountryInsight from 'components/Menu/Insights/CountryInsight'

export default function InsightsModal ({ onClose, insight }) {
  let InsightContent

  switch (insight.title) {
    case 'Members':
      InsightContent = MembersInsight
      break
    case 'Age':
      InsightContent = AgeInsight
      break
    case 'Country':
      InsightContent = CountryInsight
      break
    default:
      break
  }

  return (
    <Modal isOpen isCentered onClose={onClose} size='lg'>
      <ModalOverlay />
      <ModalContent h='400px' w='100%'>
        <ModalHeader>{insight.description || insight.title}</ModalHeader>
        <ModalBody h='300px'>
          {InsightContent && <InsightContent />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

import { useRef } from 'react'

import {
  IconButton,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { MdDone, MdClose } from 'react-icons/md'

export default function ConfirmationModal (props) {
  const {
    title = 'Delete',
    description = 'Are you sure? You can\'t undo this action.',
    onConfirm,
    onCancel,
    isLoading
  } = props

  const cancelRef = useRef()

  return (
    <AlertDialog
      isOpen
      isCentered
      leastDestructiveRef={cancelRef}
      onClose={onCancel}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            {description}
          </AlertDialogBody>

          <AlertDialogFooter alignSelf='center'>
            <IconButton
              icon={<MdClose size='1.5rem' />}
              aria-label='Cancel'
              isRound
              bg='hsla(358, 75%, 50%, 1)'
              ref={cancelRef}
              onClick={onCancel}
            />
            <IconButton
              icon={<MdDone size='1.5rem' />}
              aria-label='Confirm'
              isRound
              bg='hsla(120, 75%, 50%, 1)'
              onClick={onConfirm}
              isLoading={isLoading}
              ml={6}
            />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

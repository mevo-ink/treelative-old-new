import {
  Text,
  Modal,
  Stack,
  Alert,
  Button,
  ModalBody,
  AlertIcon,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton
} from '@chakra-ui/react'

import ErrorAlert from 'components/_common/ErrorAlert'

export default function FormDialog (props) {
  const {
    title = 'Form Title',
    subTitle = '',
    formID = 'somethingUnique',
    submitLabel = 'Submit',
    error,
    additionalErrors = [],
    loading,
    isDisabled,
    onSubmit = console.log,
    onClose,
    children,
    ...rest
  } = props

  return (
    <Modal
      isOpen
      onClose={onClose}
      closeOnOverlayClick={false}
      scrollBehavior='inside'
      {...rest}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          {title}
          <Text fontSize='xs'>{subTitle}</Text>
        </ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody as='form' id={formID} onSubmit={onSubmit}>
          {children}
        </ModalBody>
        <ModalFooter>
          <Stack spacing='4' width='100%'>
            {error && <ErrorAlert> {error.message} </ErrorAlert>}
            <Stack spacing='1' width='100%'>
              {additionalErrors.map((error, idx) => (
                <Alert key={idx} status='error' borderRadius='lg'> <AlertIcon /> {error.message} </Alert>
              ))}
            </Stack>
            <Button
              isFullWidth
              type='submit'
              variant='submit'
              form={formID}
              isLoading={loading}
              isDisabled={isDisabled}
            >
              {submitLabel}
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

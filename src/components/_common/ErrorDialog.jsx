import {
  Modal,
  Alert,
  Image,
  Button,
  ModalBody,
  AlertIcon,
  AlertTitle,
  ModalOverlay,
  ModalContent,
  AlertDescription
} from '@chakra-ui/react'

import ErrorSVG from 'images/error.svg'

export default function ErrorDialog ({ status = 'error', children, ...props }) {
  return (
    <Modal isOpen closeOnOverlayClick={false} scrollBehavior='inside' {...props}>
      <ModalOverlay />
      <ModalContent bg='transparent'>
        <ModalBody p='0' textAlign='center'>
          <Alert
            status={status}
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            borderRadius='xl'
          >
            <Image ignoreFallback width='200px' src={ErrorSVG} alt='Error' pb='4' />
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg' mr={0}>
              {status.toUpperCase()}
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
              {children}
            </AlertDescription>
            {status === 'error' && (
              <Button size='lg' mt='4' colorScheme='red' onClick={() => { window.location.href = '/' }}>
                Refresh
              </Button>
            )}
          </Alert>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

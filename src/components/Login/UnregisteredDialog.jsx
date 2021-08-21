import {
  Text,
  Modal,
  Alert,
  Image,
  Stack,
  ModalBody,
  AlertIcon,
  AlertTitle,
  ModalOverlay,
  ModalContent,
  AlertDescription,
  ModalCloseButton
} from '@chakra-ui/react'

export default function UnregisteredDialog ({ error }) {
  return (
    <Modal isOpen closeOnOverlayClick={false} scrollBehavior='inside' onClose={() => window.location.reload()}>
      <ModalOverlay />
      <ModalContent position='relative'>
        <ModalCloseButton size='lg' position='absolute' right='5px' top='5px' zIndex='1' />
        <ModalBody p='0'>
          <Stack alignItems='center'>
            <Alert
              status='warning'
              variant='subtle'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              textAlign='center'
              borderRadius='lg'
              pb='4'
            >
              <Image ignoreFallback width='200px' src='/images/unregistered.svg' alt='Unregistered' pb='4' />
              <AlertIcon boxSize='40px' mr={0} />
              <AlertTitle mt={4} mb={1} fontSize='lg'>
                No Account Found
              </AlertTitle>
              <AlertDescription>
                {error.message.split(']').pop()} <br />
              </AlertDescription>
              <Text my='4'>Please contact us to connect your email with your profile.</Text>
            </Alert>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

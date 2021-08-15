import { useState, useEffect } from 'react'

import {
  Modal,
  Button,
  useToast,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

export default function useServiceWorker () {
  const toast = useToast()

  const [newVersionAvailable, setNewVersionAvailable] = useState(false)

  const updateServiceWorker = () => {
    // Send a message to the waiting service worker, instructing it to activate.
    window.workbox.messageSkipWaiting()
    setNewVersionAvailable(false)
    window.location.reload()
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
      window.workbox.addEventListener('waiting', () => setNewVersionAvailable(true))
      window.workbox.register()
    }
  }, [])

  useEffect(() => {
    if (newVersionAvailable) {
      toast({
        render: () => (
          <Modal
            isOpen
            isCentered
            onClose={() => { }}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent textAlign='center' p='1rem'>
              <ModalHeader>
                A new version has been released!
              </ModalHeader>
              <ModalBody>
                <Button variant='submit' onClick={updateServiceWorker}>
                  UPDATE
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        ),
        position: 'top',
        duration: null,
        isClosable: false
      })
    }
  }, [newVersionAvailable])
}

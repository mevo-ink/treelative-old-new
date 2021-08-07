import { useState, useEffect } from 'react'

import * as serviceWorker from 'serviceWorkerRegistration'

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

  const [waitingWorker, setWaitingWorker] = useState()
  const [newVersionAvailable, setNewVersionAvailable] = useState(false)

  const onServiceWorkerUpdate = registration => {
    setWaitingWorker(registration && registration.waiting)
    setNewVersionAvailable(true)
  }

  const updateServiceWorker = () => {
    waitingWorker && waitingWorker.postMessage({ type: 'SKIP_WAITING' })
    setNewVersionAvailable(false)
    window.location.reload()
  }

  useEffect(() => {
    // register service worker
    if (process.env.NODE_ENV === 'production') {
      serviceWorker.register({ onUpdate: onServiceWorkerUpdate })
    }
    if (newVersionAvailable) {
      toast({
        render: () => (
          <Modal
            isOpen
            isCentered
            onClose={() => {}}
            closeOnOverlayClick={false}
          >
            <ModalOverlay />
            <ModalContent textAlign='center' p='1rem'>
              <ModalHeader>
                A new version has been released!
              </ModalHeader>
              <ModalBody>
                <Button variant='submit' onClick={updateServiceWorker}>UPDATE</Button>
              </ModalBody>
            </ModalContent>
          </Modal>
        ),
        position: 'top',
        duration: null,
        isClosable: false
      })
    } // eslint-disable-next-line
  }, [newVersionAvailable])
}

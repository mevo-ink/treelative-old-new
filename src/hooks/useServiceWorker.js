import { useState, useEffect } from 'react'

import * as serviceWorker from 'serviceWorkerRegistration'

import {
  Box,
  Text,
  Button,
  useToast
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
          <Box p='4' textAlign='center' borderRadius='xl' bg='purple.600' color='white'>
            <Text fontWeight='bold' mb={2}>A new version has been released</Text>
            <Button size='lg' onClick={updateServiceWorker}>UPDATE</Button>
          </Box>
        ),
        position: 'top',
        duration: null,
        isClosable: false
      })
    } // eslint-disable-next-line
  }, [newVersionAvailable])
}

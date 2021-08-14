import { useEffect, useState } from 'react'

import {
  Stack,
  Alert,
  AlertIcon,
  AspectRatio,
  createStandaloneToast
} from '@chakra-ui/react'

import FormDialog from 'components/_common/FormDialog'
import LocationSelection from 'components/_common/LocationSelection'

const toast = createStandaloneToast()

export default function LocationModal (props) {
  const {
    title,
    value,
    error,
    onClose,
    onSubmit,
    isLoading
  } = props

  const [location, setLocation] = useState({ label: value?.description, value })
  const [locationURL, setLocationURL] = useState('')

  useEffect(() => {
    if (location?.value) {
      const key = process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY
      const q = `place_id:${location.value.place_id}`
      const zoom = '14'
      setLocationURL(`https://www.google.com/maps/embed/v1/place?key=${key}&q=${q}&zoom=${zoom}`)
    }
    // eslint-disable-next-line
  }, [location?.value?.description])

  const handleOnSubmit = (e) => {
    e.preventDefault()
    onSubmit(location.value)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully Location Updated',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
          onClose(true)
        }
      })
      .catch(console.log)
  }

  return (
    <FormDialog
      isCentered
      closeOnOverlayClick
      title={title}
      submitLabel='Submit'
      error={error}
      loading={isLoading}
      onClose={onClose}
      onSubmit={handleOnSubmit}
      size='xl'
    >
      <Stack spacing='8' minH='300px'>
        {error && <Alert status='warning' borderRadius='lg'> <AlertIcon /> {error} </Alert>}
        <LocationSelection
          value={location}
          onChange={setLocation}
        />
        <AspectRatio>
          <iframe
            title={title}
            src={locationURL}
            loading='lazy'
            alt={location.label}
          />
        </AspectRatio>
      </Stack>
    </FormDialog>
  )
}

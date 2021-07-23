import { useEffect, useState } from 'react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import {
  Text,
  Stack,
  Alert,
  Button,
  AlertIcon,
  keyframes,
  AspectRatio,
  useDisclosure,
  createStandaloneToast
} from '@chakra-ui/react'

import FormDialog from 'components/_common/FormDialog'
import LocationSelection from 'components/_common/LocationSelection'

import RemoveButton from 'components/_input/RemoveButton'

const toast = createStandaloneToast()

export default function InputDialogTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const {
    reset,
    textAlign,
    onClose: onParentClose,
    defaultIsOpen = false,
    ...inputProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen })

  const handleClose = (success = false) => {
    reset && reset()
    onClose()
    defaultIsOpen && onParentClose(success)
  }

  if (!isEditMode && !defaultIsOpen) {
    return (
      <Text variant='info'>
        {inputProps?.value ? inputProps?.value?.suggested?.terms?.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
      </Text>
    )
  }

  return (
    <>
      {isOpen && <InputDialog {...inputProps} value={inputProps?.value?.suggested} onClose={handleClose} />}
      <Button
        onClick={onOpen}
        variant='editable-input'
        animation={`${wiggle} infinite .15s linear`}
      >
        {isEditMode && <RemoveButton inputProps={inputProps} />}
        {inputProps?.value ? inputProps?.value?.suggested?.terms?.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
      </Button>
    </>
  )
}

function InputDialog (props) {
  const {
    onClose,
    value = '',
    title = '',
    onSubmit = console.log,
    loading,
    error,
    notification = '',
    alert = ''
  } = props

  const [location, setLocation] = useState({ label: value?.description, value })
  const [locationURL, setLocationURL] = useState('')

  useEffect(() => {
    if (location?.value) {
      const key = process.env.REACT_APP_GOOGLE_LOCATION_API_KEY
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
          if (notification) {
            toast({
              title: notification,
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
          }
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
      loading={loading}
      onClose={onClose}
      onSubmit={handleOnSubmit}
      size='xl'
    >
      <Stack spacing='8' minH='300px'>
        {alert && <Alert status='warning' borderRadius='lg'> <AlertIcon /> {alert} </Alert>}
        <LocationSelection
          value={location}
          onChange={setLocation}
        />
        {/* <GooglePlacesSelect
          autoFocus
          value={location}
          onChange={setLocation}
        /> */}
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

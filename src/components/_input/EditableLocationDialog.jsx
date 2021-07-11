import { useEffect, useState } from 'react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import {
  Text,
  Stack,
  Button,
  AspectRatio,
  useDisclosure,
  createStandaloneToast
} from '@chakra-ui/react'

import { motion, AnimatePresence } from 'framer-motion'

import FormDialog from 'components/_common/FormDialog'
import GooglePlacesSelect from 'components/_select/GooglePlacesSelect'

const toast = createStandaloneToast()

const MotionButton = motion(Button)

export default function InputDialogTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const [animate, setAnimate] = useState(false)

  const variants = {
    start: {
      rotate: [0, -3, 3, 0],
      transition: {
        repeat: Infinity,
        duration: Math.random() * 0.05 + 0.2
      }
    }
  }
  // eslint-disable-next-line
  useEffect(() => { setAnimate(true) }, [])

  const {
    reset,
    textAlign,
    onClose: onParentClose,
    ...inputProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!isEditMode) {
    return (
      <Text variant='info'>
        {inputProps?.value ? inputProps?.value.terms.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
      </Text>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && <InputDialog {...inputProps} onClose={onClose} />}
      <MotionButton
        onClick={onOpen}
        variant='editable-input'
        variants={variants}
        animate={animate && 'start'}
      >
        {inputProps?.value ? inputProps?.value.terms.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
      </MotionButton>
    </AnimatePresence>
  )
}

function InputDialog (props) {
  const {
    onClose,
    value = '',
    title = '',
    subTitle = '',
    onSubmit = console.log,
    loading,
    error,
    notification = ''
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
          onClose()
        }
      })
      .catch(console.log)
  }

  return (
    <FormDialog
      isCentered
      closeOnOverlayClick
      title={title}
      subTitle={subTitle}
      submitLabel='Submit'
      error={error}
      loading={loading}
      onClose={onClose}
      onSubmit={handleOnSubmit}
      size='xl'
    >
      <Stack spacing='8' minH='300px'>
        <GooglePlacesSelect
          autoFocus
          value={location}
          onChange={setLocation}
        />
        <AspectRatio ratio={16 / 9}>
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

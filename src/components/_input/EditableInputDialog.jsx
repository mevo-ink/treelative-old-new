import { useEffect, useState } from 'react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import {
  Text,
  Input,
  Button,
  Textarea,
  InputGroup,
  FormControl,
  useDisclosure,
  InputLeftAddon,
  createStandaloneToast
} from '@chakra-ui/react'

import { motion, AnimatePresence } from 'framer-motion'

import FormDialog from 'components/_common/FormDialog'

import { object } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
    ...inputProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!isEditMode) {
    return (
      <Text
        w='50%'
        m='1rem 0rem'
        fontSize='1.2rem'
        lineHeight='1.3em'
        fontWeight='600'
        textAlign='center'
      >
        {props.value}
      </Text>
    )
  }

  return (
    <AnimatePresence>
      {isOpen && <InputDialog {...inputProps} onClose={onClose} />}
      <MotionButton
        onClick={onOpen}
        w='50%'
        m='1rem 0rem'
        fontSize='1.2rem'
        lineHeight='1.3em'
        fontWeight='600'
        textAlign='center'
        variant='editable-input'
        variants={variants}
        animate={animate && 'start'}
      >
        {props.value}
      </MotionButton>
    </AnimatePresence>
  )
}

function InputDialog (props) {
  const {
    onClose,
    type = 'text',
    name = 'inputFieldName',
    value = '',
    title = '',
    subTitle = '',
    placeholder = 'Type here ...',
    onSubmit = console.log,
    validation,
    loading,
    error,
    rows = 10,
    notification = '',
    leftAddon
  } = props

  const InputElement = type === 'textarea' ? Textarea : Input

  const schemaValidation = object().shape({
    [name]: validation
  })

  const onCancel = () => {
    reset()
    onClose()
  }

  const { handleSubmit, formState: { errors }, register, reset, setFocus } = useForm({
    defaultValues: { [name]: value },
    resolver: yupResolver(schemaValidation)
  })

  // eslint-disable-next-line
  useEffect(() => { setTimeout(() => setFocus(name), 1) }, [])

  const handleOnSubmit = (form) => {
    const submitData = type !== 'number' ? form[name].trim() : parseInt(form[name])
    onSubmit(submitData)
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
      error={error || errors[name]}
      loading={loading}
      onClose={onCancel}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <FormControl isInvalid={errors[name] || Boolean(error)}>
        <InputGroup>
          {leftAddon && <InputLeftAddon> {leftAddon} </InputLeftAddon>}
          <InputElement
            {...register(name)}
            type={type}
            placeholder={placeholder}
            rows={rows}
          />
        </InputGroup>
      </FormControl>
    </FormDialog>
  )
}

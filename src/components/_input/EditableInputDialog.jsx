import { useEffect } from 'react'

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

import { BiEdit } from 'react-icons/bi'

import FormDialog from 'components/_common/FormDialog'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object } from 'yup'

const toast = createStandaloneToast()

export default function InputDialogTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const {
    reset,
    ...inputProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!isEditMode) {
    return <Text fontSize={inputProps.fontSize || 'sm'}>{inputProps.value || 'N/A'}</Text>
  }

  return (
    <>
      {isOpen && <InputDialog {...inputProps} onClose={onClose} />}
      <Button size='sm' onClick={onOpen} rightIcon={<BiEdit />} variant='outline' whiteSpace='normal' height='100%' wordBreak='break-all'>
        {inputProps.value}
      </Button>
    </>
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

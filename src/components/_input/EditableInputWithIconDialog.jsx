import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import {
  Flex,
  Image,
  Input,
  Button,
  Textarea,
  keyframes,
  InputGroup,
  FormControl,
  useDisclosure,
  InputLeftAddon,
  createStandaloneToast
} from '@chakra-ui/react'

import FormDialog from 'components/_common/FormDialog'

import { object } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
    ...inputProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = () => {
    if (isEditMode) onOpen()
    else console.log('What Are We Going To Do OnClick?')
  }

  return (
    <>
      {isOpen && <InputDialog {...inputProps} onClose={onClose} />}
      <Flex justifyContent='center' animation={isEditMode && `${wiggle} infinite .15s linear`}>
        <Image
          src={props.icon}
          h='100%'
          objectFit='contain'
          p='.4em'
          background='hsla(0, 0%, 100%, .2)'
          boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
          borderLeftRadius='999px'
        />
        <Button
          variant='editable-input'
          maxW='200px'
          mt='0'
          fontSize='14px'
          borderLeftRadius='unset'
          onClick={handleClick}
        >
          {props.value}
        </Button>
      </Flex>
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

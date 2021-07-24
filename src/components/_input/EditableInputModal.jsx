import { useEffect } from 'react'

import {
  Link,
  Input,
  Textarea,
  InputGroup,
  FormControl,
  InputLeftAddon,
  FormHelperText,
  createStandaloneToast
} from '@chakra-ui/react'

import { object } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import FormDialog from 'components/_common/FormDialog'

const toast = createStandaloneToast()

export default function EditableInputModal (props) {
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
    leftAddon,
    prefix = ''
  } = props

  const InputElement = type === 'textarea' ? Textarea : Input

  const schemaValidation = object().shape({
    [name]: validation
  })

  const onCancel = () => {
    reset()
    onClose()
  }

  const { handleSubmit, formState: { errors }, register, reset, setFocus, getValues, watch } = useForm({
    defaultValues: { [name]: value },
    resolver: yupResolver(schemaValidation)
  })

  watch([name])

  // eslint-disable-next-line
  useEffect(() => { setTimeout(() => setFocus(name), 1) }, [])

  const handleOnSubmit = (form) => {
    let submitData = type !== 'number' ? form[name].trim() : parseInt(form[name])
    if (prefix) submitData = prefix + submitData
    onSubmit(submitData)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully Updated',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
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
        {prefix && (
          <FormHelperText isExternal as={Link} href={`${prefix}${getValues(name)}`}>
            {prefix}{getValues(name)}
          </FormHelperText>
        )}
      </FormControl>
    </FormDialog>
  )
}

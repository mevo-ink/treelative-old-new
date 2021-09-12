import { useEffect } from 'react'

import {
  Link,
  Input,
  FormControl,
  FormHelperText,
  createStandaloneToast
} from '@chakra-ui/react'

import { object } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import FormDialog from 'components/_common/FormDialog'

const toast = createStandaloneToast()

export default function InputModal (props) {
  const {
    onClose,
    name,
    value,
    title,
    placeholder = 'Type here..',
    onSubmit,
    validation,
    isLoading,
    error,
    prefix = ''
  } = props

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
    let submitData = form[name].trim()
    if (prefix) submitData = prefix + submitData
    onSubmit(submitData)
      .then(() => {
        toast({
          title: 'Successfully Updated',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true
        })
        onClose()
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
      loading={isLoading}
      onClose={onCancel}
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <FormControl isInvalid={errors[name] || Boolean(error)}>
        <Input
          {...register(name)}
          type='text'
          placeholder={placeholder}
        />
        {prefix && (
          <FormHelperText isExternal as={Link} href={`${prefix}${getValues(name)}`}>
            {prefix}{getValues(name)}
          </FormHelperText>
        )}
      </FormControl>
    </FormDialog>
  )
}

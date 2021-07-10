import { useState, useEffect } from 'react'

import useDevice from 'hooks/useDevice'

import { ADD_USER } from 'graphql/mutations/users'
import { useMutation } from 'urql'

import {
  Input,
  Stack,
  Button,
  FormLabel,
  FormControl,
  useDisclosure,
  FormErrorMessage,
  createStandaloneToast
} from '@chakra-ui/react'

import { FaPlus } from 'react-icons/fa'

import FormDialog from 'components/_common/FormDialog'
import DateTimePicker from 'components/_input/DateTimePicker'
import GooglePlacesSelect from 'components/_select/GooglePlacesSelect'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

const toast = createStandaloneToast()

const schemaValidation = object().shape({
  email: string().email(),
  phoneNumber: string().matches(/^\+?\d{10,14}$/, { message: 'Invalid Phone Number', excludeEmptyString: true }),
  fullName: string().required(),
  shortName: string().required()
})

export default function CreateUser () {
  const { isDesktop } = useDevice()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    onClose()
    resetForm()
  }

  const [internalError, setInternalError] = useState()

  const [{ error, fetching }, createUser] = useMutation(ADD_USER)

  const { register, handleSubmit, formState: { errors }, reset: resetForm, setFocus, setValue, getValues, watch } = useForm({
    resolver: yupResolver(schemaValidation)
  })
  watch(['dateOfBirth', 'birthLocation', 'currentLocation'])

  useEffect(() => { isDesktop && isOpen && setTimeout(() => setFocus('fullName'), 1) }, [isOpen])

  const onSubmit = ({ birthLocation, currentLocation, email, ...rest }) => {
    const input = {
      ...rest,
      birthLocation: birthLocation?.value,
      currentLocation: currentLocation?.value
    }
    if (email) input.email = email
    createUser({ input })
      .then(async result => {
        if (result.data) {
          toast({
            title: 'Successfully created the user',
            status: 'success',
            position: 'top',
            duration: 5000,
            isClosable: true
          })
          handleClose()
        }
      })
      .catch(setInternalError)
  }

  return (
    <>
      <Button size='sm' leftIcon={<FaPlus />} onClick={onOpen}>
        ADD USER
      </Button>
      {isOpen && (
        <FormDialog
          isCentered
          title='Create User'
          formID='#createUser'
          size='2xl'
          error={error || internalError}
          loading={fetching}
          onClose={handleClose}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing='8'>
            <Stack direction='row'>
              <FormControl isRequired isInvalid={errors?.fullName}>
                <FormLabel>Full Name</FormLabel>
                <Input {...register('fullName')} />
                <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isRequired isInvalid={errors?.shortName}>
                <FormLabel>Short Name</FormLabel>
                <Input {...register('shortName')} />
                <FormErrorMessage>{errors?.shortName?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction='row'>
              <FormControl isInvalid={errors?.email}>
                <FormLabel>Email</FormLabel>
                <Input {...register('email')} type='email' />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors?.phoneNumber}>
                <FormLabel>Phone Number</FormLabel>
                <Input {...register('phoneNumber')} />
                <FormErrorMessage>
                  {errors?.phoneNumber?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack direction='row' justifyContent='space-around' alignItems='center' spacing='4'>
              <FormControl maxW='200px'>
                <FormLabel>Date of Birth</FormLabel>
                <DateTimePicker
                  inline
                  type='date'
                  label='Date of Birth'
                  value={getValues('dateOfBirth')}
                  onChange={dateOfBirth => setValue('dateOfBirth', dateOfBirth)}
                  error={errors?.dateOfBirth}
                  fontSize='md'
                />
              </FormControl>
              <FormControl>
                <FormLabel>Birth Location</FormLabel>
                <GooglePlacesSelect
                  menuPlacement='top'
                  value={getValues('birthLocation')}
                  onChange={birthLocation => setValue('birthLocation', birthLocation)}
                />
              </FormControl>
            </Stack>
            <FormControl>
              <FormLabel>Current Location</FormLabel>
              <GooglePlacesSelect
                menuPlacement='top'
                value={getValues('currentLocation')}
                onChange={currentLocation => setValue('currentLocation', currentLocation)}
              />
            </FormControl>
          </Stack>
        </FormDialog>
      )}
    </>
  )
}

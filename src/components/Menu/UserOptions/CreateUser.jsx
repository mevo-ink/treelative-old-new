import { useState, useEffect } from 'react'

import {
  Input,
  Stack,
  FormLabel,
  IconButton,
  FormControl,
  useDisclosure,
  FormErrorMessage,
  createStandaloneToast
} from '@chakra-ui/react'
import { IoPersonAddSharp } from 'react-icons/io5'

import { useMutation } from 'react-query'
import { createUser } from 'graphql/client/mutations/users'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import useDevice from 'hooks/useDevice'
import FormDialog from 'components/_common/FormDialog'

import { firebaseAuth } from 'utils/firebaseApp'

const toast = createStandaloneToast()

const schemaValidation = object().shape({
  fullName: string().required(),
  shortName: string().required()
})

export default function CreateUser ({ initialValue = '', onClose: onParentClose }) {
  const { isDesktop } = useDevice()

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: initialValue })

  const layoutMethods = useRecoilValue(layoutMethodsAtom)

  const handleClose = (response) => {
    onClose()
    resetForm()
    onParentClose && onParentClose(response)
  }

  const [internalError, setInternalError] = useState()

  const { mutateAsync, error, isLoading } = useMutation(createUser)

  const { register, handleSubmit, formState: { errors }, reset: resetForm, setFocus } = useForm({
    defaultValues: { fullName: initialValue },
    resolver: yupResolver(schemaValidation)
  })

  // eslint-disable-next-line
  useEffect(() => { (isDesktop || initialValue) && isOpen && setTimeout(() => setFocus('fullName'), 1) }, [isOpen])

  const onSubmit = async (input) => {
    const token = await firebaseAuth.currentUser.getIdToken()
    mutateAsync({ input, token })
      .then(data => {
        toast({
          title: 'Successfully User Created',
          status: 'success',
          position: 'top',
          duration: 5000,
          isClosable: true
        })
        layoutMethods.refetch()
        handleClose(data)
      })
      .catch(setInternalError)
  }

  return (
    <>
      <IconButton
        isRound
        icon={<IoPersonAddSharp color='white' />}
        aria-label='Create User Button'
        size='sm'
        bg='hsla(220, 100%, 60%, .8)'
        onClick={onOpen}
      />
      {isOpen && (
        <FormDialog
          isCentered
          title='Create User'
          formID='#createUser'
          size='2xl'
          error={error || internalError}
          loading={isLoading}
          onClose={handleClose}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing='8'>
            <FormControl isRequired isInvalid={errors?.fullName}>
              <FormLabel>Full Name</FormLabel>
              <Input aria-label='full-name' {...register('fullName')} />
              <FormErrorMessage>{errors?.fullName?.message}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired isInvalid={errors?.shortName}>
              <FormLabel>Short Name</FormLabel>
              <Input aria-label='short-name' {...register('shortName')} />
              <FormErrorMessage>{errors?.shortName?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </FormDialog>
      )}
    </>
  )
}

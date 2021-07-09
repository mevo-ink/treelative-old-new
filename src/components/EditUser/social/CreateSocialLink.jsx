import { useState } from 'react'

import { ADD_SOCIAL_LINK } from 'graphql/mutations/socialLinks'
import { useMutation } from 'urql'

import FormDialog from 'components/_common/FormDialog'

import {
  Input,
  Stack,
  Select,
  Button,
  FormLabel,
  FormControl,
  useDisclosure,
  FormErrorMessage,
  createStandaloneToast
} from '@chakra-ui/react'

import { FaPlus } from 'react-icons/fa'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

const toast = createStandaloneToast()

const schemaValidation = object().shape({
  type: string().required(),
  url: string().url().required()
})

export default function CreateSocialLink ({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    onClose()
    resetForm()
  }

  const [internalError, setInternalError] = useState()

  const [{ error, fetching }, createSocialLink] = useMutation(ADD_SOCIAL_LINK)

  const { register, handleSubmit, formState: { errors }, reset: resetForm } = useForm({
    resolver: yupResolver(schemaValidation)
  })

  const onSubmit = (data) => {
    const input = {
      ...data,
      userID: user.id
    }
    createSocialLink({ input })
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully created the social link',
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
        Add New
      </Button>
      {isOpen && (
        <FormDialog
          isCentered
          title='Add Social Link'
          formID='#createSocialLink'
          error={error || internalError}
          loading={fetching}
          onClose={handleClose}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing='8'>
            <FormControl>
              <FormLabel>Platform</FormLabel>
              <Select {...register('type')}>
                {['FACEBOOK', 'INSTAGRAM', 'TWITTER', 'LINKEDIN', 'WEBSITE'].map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired isInvalid={errors?.url}>
              <FormLabel>URL</FormLabel>
              <Input {...register('url')} placeholder='(eg): https://www.facebook.com/Jana.JR.19/' />
              <FormErrorMessage>{errors?.url?.message}</FormErrorMessage>
            </FormControl>
          </Stack>
        </FormDialog>
      )}
    </>
  )
}

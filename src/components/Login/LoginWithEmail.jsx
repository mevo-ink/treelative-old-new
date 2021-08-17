import { useState } from 'react'

import {
  Flex,
  Input,
  Stack,
  Button,
  FormLabel,
  FormControl
} from '@chakra-ui/react'
import { IoCaretBack } from 'react-icons/io5'

import { useMutation } from 'urql'
import { object, string } from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { LOGIN } from 'graphql/mutations/auth'

import ErrorAlert from 'components/_common/ErrorAlert'
import ErrorModal from 'components/_common/ErrorModal'
import PasswordInput from 'components/_common/PasswordInput'

const schemaValidation = object().shape({
  username: string().required(),
  password: string().required().min(3)
})

export default function LoginWithEmail ({ onLoginSuccess, setInternalError, setShowLoginWithEmail }) {
  const [loginResult, login] = useMutation(LOGIN)

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)

  const onLoginWithPassword = (input) => {
    login({ input })
      .then(onLoginSuccess)
      .catch(setInternalError)
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaValidation)
  })
  return (
    <>
      {isForgotPasswordOpen && <ErrorModal isContact message='Please' />}
      <Stack
        as='form'
        w='100%'
        spacing='2rem'
        onSubmit={handleSubmit(onLoginWithPassword)}
      >
        <FormControl id='username' isRequired isInvalid={errors?.username}>
          <FormLabel>Email</FormLabel>
          <Input
            {...register('username')}
            type='username'
            autoComplete='off'
          />
          <ErrorAlert>{errors?.username?.message}</ErrorAlert>
        </FormControl>
        {loginResult.error && <ErrorAlert>{loginResult.error.message}</ErrorAlert>}
        <Button
          type='submit'
          variant='submit'
          bg='linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))'
          _hover={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
          _active={{ bg: 'linear-gradient(180deg, hsl(0, 0%, 27%), hsl(0, 0%, 17%))' }}
          isLoading={loginResult.fetching}
        >
          Send Verification
        </Button>
      </Stack>
      <Button
        leftIcon={<IoCaretBack />}
        h='auto'
        p='.5rem'
        ml='-.5rem'
        mt='.5rem'
        fontSize='.8rem'
        fontWeight='400'
        bg='transparent'
        onClick={() => setShowLoginWithEmail(false)}
      >
        Back
      </Button>
    </>
  )
}

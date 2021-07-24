import { useState, useEffect } from 'react'

import { useQuery, useMutation } from 'urql'
import { GET_USER_SETTINGS } from 'graphql/queries/users'
import { UPDATE_USER_SETTINGS } from 'graphql/mutations/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import { startCase } from 'lodash'

import {
  Text,
  Stack,
  FormLabel,
  IconButton,
  FormControl,
  FormHelperText,
  createStandaloneToast
} from '@chakra-ui/react'

import { FiEye, FiEyeOff } from 'react-icons/fi'
import { BiMessage, BiMessageX } from 'react-icons/bi'

const toast = createStandaloneToast()

const PRIVACY_FIELDS = [
  'email',
  'phoneNumber',
  'birthLocation',
  'currentLocation',
  'deathLocation',
  'dateOfBirth',
  'dateOfDeath'
]

const NOTIFICATION_FIELDS = [
  'email',
  'sms'
]

export default function EditUserSettings ({ user }) {
  const [{ error, fetching }, updateUserSettings] = useMutation(UPDATE_USER_SETTINGS)

  const [result] = useQuery({ query: GET_USER_SETTINGS, variables: { filter: { id: user.id } } })

  const [settings, setSettings] = useState({ privacy: {}, notification: {} })

  useEffect(() => {
    if (result.data) {
      setSettings(result?.data?.getUser?.settings || { privacy: {}, notification: {} })
    }
  }, [result.fetching])

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorAlert> {result.error.message} </ErrorAlert>

  const onTogglePrivacy = (field) => {
    let newSettings = { ...settings }
    if (newSettings.privacy[field]) {
      newSettings = {
        ...newSettings,
        privacy: {
          ...newSettings.privacy,
          [field]: false
        }
      }
    } else {
      newSettings = {
        ...newSettings,
        privacy: {
          ...newSettings.privacy,
          [field]: true
        }
      }
    }
    setSettings(newSettings)
    const variables = { userID: user.id, input: { settings: newSettings } }
    updateUserSettings(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully Settings Updated',
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
        }
      })
  }

  const onToggleNotification = (field) => {
    let newSettings = { ...settings }
    if (newSettings.notification[field]) {
      newSettings = {
        ...newSettings,
        notification: {
          ...newSettings.notification,
          [field]: false
        }
      }
    } else {
      newSettings = {
        ...newSettings,
        notification: {
          ...newSettings.notification,
          [field]: true
        }
      }
    }
    setSettings(newSettings)
    const variables = { userID: user.id, input: { settings: newSettings } }
    return updateUserSettings(variables)
  }

  return (
    <Stack spacing='8'>
      <FormControl>
        <FormLabel>Set Privacy</FormLabel>
        <FormHelperText>Turn off fields that you want hidden from your public profile card</FormHelperText>
        <Stack spacing='4' mt='2' ml='4'>
          {PRIVACY_FIELDS.map(field => (
            <Stack key={field} direction='row' alignItems='center'>
              <Text htmlFor={field} fontWeight='normal'>
                {startCase(field)}
              </Text>
              <IconButton
                size='sm'
                colorScheme={settings.privacy[field] ? 'red' : 'green'}
                variant='ghost'
                aria-label='Toggle Field'
                fontSize='20px'
                icon={settings.privacy[field] ? <FiEyeOff /> : <FiEye />}
                onClick={() => onTogglePrivacy(field)}
              />
            </Stack>
          ))}
        </Stack>
      </FormControl>
      <FormControl>
        <FormLabel>Receive Notification</FormLabel>
        <FormHelperText>Stop receiving notifications about events or reminders</FormHelperText>
        <Stack spacing='4' mt='2' ml='4'>
          {NOTIFICATION_FIELDS.map(field => (
            <Stack key={field} direction='row' alignItems='center'>
              <Text htmlFor={field} fontWeight='normal'>
                {startCase(field)}
              </Text>
              <IconButton
                size='sm'
                colorScheme={settings.notification[field] ? 'red' : 'green'}
                variant='ghost'
                aria-label='Toggle Field'
                fontSize='20px'
                icon={settings.notification[field] ? <BiMessageX /> : <BiMessage />}
                onClick={() => onToggleNotification(field)}
              />
            </Stack>
          ))}
        </Stack>
      </FormControl>
      {fetching && <Loading />}
      {error && <ErrorAlert> {result.error.message} </ErrorAlert>}
    </Stack>
  )
}

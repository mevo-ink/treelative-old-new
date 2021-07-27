import { useState, useEffect } from 'react'

import {
  Flex,
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

import { startCase } from 'lodash'
import { useQuery, useMutation } from 'urql'

import { GET_USER_SETTINGS } from 'graphql/queries/users'
import { UPDATE_USER_SETTINGS } from 'graphql/mutations/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

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

export default function EditUserPrivacy ({ user }) {
  const [editPrivacyResult, editPrivacy] = useMutation(UPDATE_USER_SETTINGS)

  const [result] = useQuery({ query: GET_USER_SETTINGS, variables: { filter: { id: user.id } } })

  const [settings, setPrivacy] = useState({ privacy: {}, notification: {} })

  useEffect(() => {
    if (result.data) {
      setPrivacy(result?.data?.getUser?.settings || { privacy: {}, notification: {} })
    } // eslint-disable-next-line
  }, [result.fetching])

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorAlert> {result.error.message} </ErrorAlert>

  const onTogglePrivacy = (field) => {
    let newPrivacy = { ...settings }
    if (newPrivacy.privacy[field]) {
      newPrivacy = {
        ...newPrivacy,
        privacy: {
          ...newPrivacy.privacy,
          [field]: false
        }
      }
    } else {
      newPrivacy = {
        ...newPrivacy,
        privacy: {
          ...newPrivacy.privacy,
          [field]: true
        }
      }
    }
    setPrivacy(newPrivacy)
    const variables = { userID: user.id, input: { settings: newPrivacy } }
    editPrivacy(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully Privacy Updated',
            status: 'success',
            position: 'top',
            duration: 1500,
            isClosable: true
          })
        }
      })
  }

  const onToggleNotification = (field) => {
    let newPrivacy = { ...settings }
    if (newPrivacy.notification[field]) {
      newPrivacy = {
        ...newPrivacy,
        notification: {
          ...newPrivacy.notification,
          [field]: false
        }
      }
    } else {
      newPrivacy = {
        ...newPrivacy,
        notification: {
          ...newPrivacy.notification,
          [field]: true
        }
      }
    }
    setPrivacy(newPrivacy)
    const variables = { userID: user.id, input: { settings: newPrivacy } }
    return editPrivacy(variables)
  }

  return (
    <Flex justifyContent='center' alignItems='center'>
      <FormControl>
        <Text variant='info-title' mb='.3rem' textAlign='center'>Privacy</Text>
        {PRIVACY_FIELDS.map(field => (
          <Stack key={field} direction='row'>
            <Text htmlFor={field} variant='info' textAlign='start'>
              {startCase(field)}
            </Text>
            <IconButton
              size='sm'
              color={settings.privacy[field] ? 'red' : 'green'}
              variant='ghost'
              aria-label='Toggle Field'
              fontSize='20px'
              icon={settings.privacy[field] ? <FiEyeOff /> : <FiEye />}
              isLoading={editPrivacyResult.fetching}
              onClick={() => onTogglePrivacy(field)}
            />
          </Stack>
        ))}
      </FormControl>
      {/* <FormControl>
        <FormLabel>Receive Notification</FormLabel>
        {NOTIFICATION_FIELDS.map(field => (
          <Stack key={field} direction='row'>
            <Text htmlFor={field} variant='info' textAlign='start'>
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
      </FormControl> */}
    </Flex>
  )
}

import { useState, useEffect } from 'react'

import {
  Flex,
  Text,
  Stack,
  IconButton,
  FormControl
} from '@chakra-ui/react'
import { BiMessage, BiMessageX } from 'react-icons/bi'

import { startCase } from 'lodash'
import { useQuery, useMutation } from 'urql'

import { GET_USER_SETTINGS } from 'graphql/queries/users'
import { UPDATE_USER_SETTINGS } from 'graphql/mutations/users'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

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
        <Text variant='info-title' mb='.3rem' textAlign='center'>Notification</Text>
        {NOTIFICATION_FIELDS.map(field => (
          <Stack key={field} mb='.8rem' direction='row'>
            <Text htmlFor={field} variant='info' textAlign='start'>
              {startCase(field)}
            </Text>
            <IconButton
              size='sm'
              h='20px'
              color={settings.notification[field] ? 'red' : 'green'}
              variant='ghost'
              aria-label='Toggle Field'
              fontSize='20px'
              icon={settings.notification[field] ? <BiMessageX /> : <BiMessage />}
              isLoading={editPrivacyResult.fetching}
              onClick={() => onToggleNotification(field)}
            />
          </Stack>
        ))}
      </FormControl>
    </Flex>
  )
}

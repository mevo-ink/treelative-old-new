import React, { useState } from 'react'

import AsyncSelect from 'components/_select/AsyncSelect'

import { useClient } from 'urql'

import { Stack } from '@chakra-ui/react'
import ErrorAlert from 'components/_common/ErrorAlert'

export default function UserSelection (props) {
  const client = useClient()

  const {
    query,
    variables = {},
    placeholder = 'Select a User',
    filterUsers = val => val,
    ...rest
  } = props

  const [error, setError] = useState()

  const transformUsers = (user) => ({ value: user.id, label: user.fullName })

  const loadUsers = async search => {
    try {
      const result = await client.query(query, { ...variables, search }).toPromise()
      if (result.data) {
        return result?.data?.users.map(transformUsers).filter(filterUsers)
      } else {
        if (result.error) {
          setError(result.error)
        }
        return []
      }
    } catch (error) {
      setError(error)
    }
  }
  return (
    <Stack spacing='4'>
      {error && <ErrorAlert> {error.message} </ErrorAlert>}
      <AsyncSelect
        {...rest}
        defaultOptions
        placeholder={placeholder}
        loadOptions={loadUsers}
        noOptionsMessage={() => 'No users matching search '}
      />
    </Stack>

  )
}

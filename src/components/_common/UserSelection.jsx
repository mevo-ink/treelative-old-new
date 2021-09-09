import React, { useState } from 'react'

import { useQueryClient } from 'react-query'

import { Stack } from '@chakra-ui/react'

import ErrorAlert from 'components/_common/ErrorAlert'
import AsyncCreatableSelect from 'components/_select/AsyncCreatableSelect'

export default function UserSelection (props) {
  const queryClient = useQueryClient()

  const {
    query: queryFunction,
    variables = {},
    placeholder = 'Select a User',
    filterUsers = val => val,
    ...rest
  } = props

  const [error, setError] = useState()

  const transformUsers = (user) => ({ value: user.id, label: user.fullName })

  const loadUsers = async query => {
    try {
      const data = await queryClient.fetchQuery(['searchLocations', { ...variables, query }], queryFunction)
      if (data) {
        return data.map(transformUsers).filter(filterUsers)
      } else {
        return []
      }
    } catch (error) {
      setError(error)
    }
  }
  return (
    <Stack spacing='4'>
      {error && <ErrorAlert> {error.message} </ErrorAlert>}
      <AsyncCreatableSelect
        {...rest}
        defaultOptions
        placeholder={placeholder}
        loadOptions={loadUsers}
        noOptionsMessage={() => 'No users matching search '}
      />
    </Stack>

  )
}

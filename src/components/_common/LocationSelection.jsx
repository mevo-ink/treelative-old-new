import React, { useState } from 'react'

import { Stack } from '@chakra-ui/react'

import { useQueryClient } from 'react-query'
import { searchLocations } from 'graphql/client/queries/search'

import ErrorAlert from 'components/_common/ErrorAlert'
import AsyncSelect from 'components/_select/AsyncSelect'

export default function LocationSelection (props) {
  const {
    placeholder = 'Select a Location',
    ...rest
  } = props

  const queryClient = useQueryClient()

  const [error, setError] = useState()

  const transformLocations = (location) => ({ value: location, label: location.description })

  const loadLocations = async query => {
    try {
      const data = await queryClient.fetchQuery(['searchLocations', { query }], searchLocations)
      if (data) {
        return data.map(transformLocations)
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
      <AsyncSelect
        {...rest}
        defaultOptions
        placeholder={placeholder}
        loadOptions={loadLocations}
        noOptionsMessage={() => 'No matching search '}
      />
    </Stack>

  )
}

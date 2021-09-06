import React, { useState } from 'react'

import { Stack } from '@chakra-ui/react'

import { useClient } from 'urql'

import { SUGGEST_LOCATIONS } from 'graphql/client/queries/suggestList'

import ErrorAlert from 'components/_common/ErrorAlert'
import AsyncSelect from 'components/_select/AsyncSelect'

export default function LocationSelection (props) {
  const client = useClient()

  const {
    placeholder = 'Select a Location',
    ...rest
  } = props

  const [error, setError] = useState()

  const transformLocations = (location) => ({ value: location, label: location.description })

  const loadLocations = async search => {
    try {
      const result = await client.query(SUGGEST_LOCATIONS, { search }).toPromise()
      if (result.data) {
        return result?.data?.locations.map(transformLocations)
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
        loadOptions={loadLocations}
        noOptionsMessage={() => 'No matching search '}
      />
    </Stack>

  )
}

import React, { useState } from 'react'

import AsyncSelect from 'components/_select/AsyncSelect'

import { useClient } from 'urql'
import { LIST_LOCATION_SUGGESTIONS } from 'graphql/queries/locations'

import { Stack } from '@chakra-ui/react'
import ErrorAlert from 'components/_common/ErrorAlert'

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
      const result = await client.query(LIST_LOCATION_SUGGESTIONS, { search }).toPromise()
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

import React from 'react'

import GooglePlacesAutocomplete from 'react-google-places-autocomplete'

import useStyles from './useStyles'

export default function GooglePlacesSelect (props) {
  const styles = useStyles()

  return (
    <GooglePlacesAutocomplete
      apiKey={process.env.REACT_APP_GOOGLE_LOCATION_API_KEY}
      selectProps={{ ...props, styles }}
    />
  )
}

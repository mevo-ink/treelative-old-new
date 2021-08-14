import React, { forwardRef } from 'react'

import AsyncCreatableSelect from 'react-select/async-creatable'

import useStyles from './useStyles'

const CustomSelect = forwardRef((props, ref) => {
  const styles = useStyles()

  return (
    <AsyncCreatableSelect
      cacheOptions
      ref={ref}
      styles={styles}
      defaultMenuIsOpen
      autoFocus
      {...props}
    />
  )
})

export default CustomSelect

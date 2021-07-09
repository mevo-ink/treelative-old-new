import React, { forwardRef } from 'react'

import Select from 'react-select'

import useStyles from './useStyles'

const CustomSelect = forwardRef((props, ref) => {
  const styles = useStyles()

  return (
    <Select
      ref={ref}
      styles={styles}
      maxMenuHeight='200px'
      {...props}
    />
  )
})

export default CustomSelect

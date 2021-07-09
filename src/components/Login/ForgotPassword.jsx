import React from 'react'

import FormDialog from 'components/_common/FormDialog'

export default function ForgotPassword ({ onClose }) {
  return (
    <FormDialog
      isCentered
      title='Forgot your password?'
      formID='#forgotPassword'
      label='Send Email'
      // error={error}
      // loading={loading}
      onClose={onClose}
      // onSubmit={handleSubmit(onSubmit)}
    >
      TODO
    </FormDialog>
  )
}

import { useState } from 'react'

import { startCase } from 'lodash'

import { IconButton } from '@chakra-ui/react'

import { IoIosRemoveCircleOutline } from 'react-icons/io'

import ConfirmationDialog from 'components/_common/ConfirmationDialog'

export default function ClearValueButton ({ inputProps }) {
  const [isConfirm, setIsConfirm] = useState(false)

  const handleClear = (event) => {
    event.stopPropagation()
    setIsConfirm(true)
  }

  const confirmClear = () => {
    inputProps.onSubmit(inputProps.type === 'text' ? '' : null)
    setIsConfirm(false)
  }

  const cancelClear = () => {
    setIsConfirm(false)
  }

  if (!inputProps.value) return null

  return (
    <>
      {isConfirm && (
        <ConfirmationDialog title={`Clear ${startCase(inputProps.name)}`} onConfirm={confirmClear} onCancel={cancelClear} />
      )}
      <IconButton
        isRound
        size='sm'
        position='absolute'
        bg='transparent'
        top='-1rem'
        right='-0.5rem'
        color='red'
        aria-label='Clear Value'
        icon={<IoIosRemoveCircleOutline size='2rem' />}
        onClick={handleClear}
      />
    </>
  )
}

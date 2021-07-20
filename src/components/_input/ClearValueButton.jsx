import { useState } from 'react'

import { startCase } from 'lodash'

import { IconButton } from '@chakra-ui/react'

import { IoClose } from 'react-icons/io5'

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
        size
        icon={<IoClose color='hsla(355, 100%, 50%, .8)' />}
        aria-label='Clear Value'
        position='absolute'
        top='-.3rem'
        right='-.2rem'
        cursor='pointer'
        background='hsla(0, 0%, 100%, 1)'
        boxShadow='0px 3px 5px hsla(0, 0%, 0%, .3)'
        _hover={{ bg: 'hsla(0, 0%, 100%, .2)' }}
        _active={{ bg: 'hsla(0, 0%, 100%, .2)' }}
        onClick={handleClear}
      />
    </>
  )
}

import { useState } from 'react'

import { IconButton } from '@chakra-ui/react'

import { IoClose } from 'react-icons/io5'

import ConfirmationModal from 'components/_common/ConfirmationModal'

export default function RemoveButton ({ title, onRemove, isLoading }) {
  const [isConfirm, setIsConfirm] = useState(false)

  const handleClear = (event) => {
    event.stopPropagation()
    setIsConfirm(true)
  }

  const confirmClear = () => {
    onRemove()
      .then(() => setIsConfirm(false))
  }

  const cancelClear = () => {
    setIsConfirm(false)
  }

  return (
    <>
      {isConfirm && (
        <ConfirmationModal
          title={title}
          onConfirm={confirmClear}
          onCancel={cancelClear}
          isLoading={isLoading}
        />
      )}
      <IconButton
        isRound
        size
        icon={<IoClose color='hsla(355, 100%, 50%, .8)' />}
        aria-label='Clear Value'
        position='absolute'
        zIndex='1'
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

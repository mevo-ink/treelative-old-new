import { useState } from 'react'

import ConfirmationDialog from 'components/_common/ConfirmationDialog'

import {
  keyframes,
  IconButton
} from '@chakra-ui/react'

import { BiTrash } from 'react-icons/bi'

const wiggle = keyframes`
  0% { transform: rotate(0deg); }
  50% { transform: rotate(-2deg); }
  100% { transform: rotate(2deg); }
`

export default function DeleteUserRelation ({ title, onRemove, isLoading }) {
  const [isConfirm, setIsConfirm] = useState(false)

  const handleRemove = (event) => {
    event.stopPropagation()
    setIsConfirm(true)
  }

  const confirmRemove = () => {
    onRemove()
    setIsConfirm(false)
  }

  const cancelRemove = () => {
    setIsConfirm(false)
  }

  return (
    <>
      {isConfirm && (
        <ConfirmationDialog title={title} onConfirm={confirmRemove} onCancel={cancelRemove} />
      )}
      <IconButton
        icon={<BiTrash size='25px' />}
        w='100%'
        h='100%'
        color='red'
        position='absolute'
        zIndex='1'
        bg='hsla(0, 0%, 0%, .8)'
        borderRadius='50%'
        boxShadow='0px 3px 5px hsla(0, 0%, 0%, .3)'
        animation={`${wiggle} infinite .15s linear`}
        onClick={handleRemove}
        isLoading={isLoading}
      />
    </>
  )
}

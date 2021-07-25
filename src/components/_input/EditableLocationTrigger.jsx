import {
  Flex,
  Text,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import RemoveButton from 'components/_input/RemoveButton'
import EditableLocationModal from 'components/_input/EditableLocationModal'

export default function EditableLocationTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const {
    reset,
    textAlign,
    onClose: onParentClose,
    defaultIsOpen = false,
    ...inputProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen })

  const handleClose = (success = false) => {
    reset && reset()
    onClose()
    defaultIsOpen && onParentClose(success)
  }

  if (!isEditMode && !defaultIsOpen) {
    return (
      <Text variant='info'>
        {inputProps?.value ? inputProps?.value?.suggested?.terms?.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
      </Text>
    )
  }

  return (
    <Flex
      w='90%'
      justifyContent='center'
      animation={isEditMode && `${wiggle} infinite .15s linear`}
    >
      <Flex position='relative'>
        {isOpen && <EditableLocationModal {...inputProps} value={inputProps?.value?.suggested} onClose={handleClose} />}
        {isEditMode && <RemoveButton inputProps={inputProps} />}
        <Button
          onClick={onOpen}
          variant='editable-input'
          animation={`${wiggle} infinite .15s linear`}
        >
          {inputProps?.value ? inputProps?.value?.suggested?.terms?.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
        </Button>
      </Flex>
    </Flex>
  )
}

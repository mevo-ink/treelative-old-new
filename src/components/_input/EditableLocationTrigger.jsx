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
  const {
    title,
    value,
    onSubmit,
    isLoading,
    ...inputProps
  } = props

  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  if (!isEditMode) {
    return (
      <Text variant='info'>
        {value ? value?.suggested?.terms?.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
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
        {isOpen && <EditableLocationModal value={value?.suggested} onSubmit={onSubmit} onClose={onClose} {...inputProps} />}
        {isEditMode && (
          <RemoveButton
            title={title}
            onRemove={() => onSubmit(null)}
            isLoading={isLoading}
          />
        )}
        <Button
          onClick={onOpen}
          variant='editable-input'
          animation={`${wiggle} infinite .15s linear`}
        >
          {value ? value?.suggested?.terms?.slice(-3).map(val => val.value).join(', ') : 'Unavailable'}
        </Button>
      </Flex>
    </Flex>
  )
}

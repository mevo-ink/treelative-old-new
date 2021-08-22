import {
  Flex,
  Text,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import RemoveButton from 'components/_common/RemoveButton'
import LocationModal from 'components/_modal/LocationModal'

export default function LocationTrigger (props) {
  const {
    title,
    value,
    onSubmit,
    isLoading,
    defaultIsOpen,
    ...inputProps
  } = props

  const isEditMode = useRecoilValue(isEditModeAtom)

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen })

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  if (defaultIsOpen) {
    return isOpen ? <LocationModal value={value} title={title} onSubmit={onSubmit} onClose={onClose} {...inputProps} /> : null
  }

  if (!isEditMode) {
    return (
      <Text variant='info'>
        {value?.description || 'Unavailable'}
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
        {isOpen && <LocationModal value={value} title={title} onSubmit={onSubmit} onClose={onClose} {...inputProps} />}
        {isEditMode && value && (
          <RemoveButton
            title={'Remove' + title.substring(4)}
            onRemove={() => onSubmit(null)}
            isLoading={isLoading}
          />
        )}
        <Button
          onClick={onOpen}
          variant='editable-input'
          animation={`${wiggle} infinite .15s linear`}
        >
          {value?.description || 'Unavailable'}
        </Button>
      </Flex>
    </Flex>
  )
}

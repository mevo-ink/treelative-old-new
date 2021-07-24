import {
  Flex,
  Text,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import EditableInputModal from 'components/_input/EditableInputModal'
import RemoveButton from 'components/_input/RemoveButton'

export default function EditableInputTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const {
    reset,
    ...inputProps
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  if (!isEditMode) {
    return (
      <Text
        w='50%'
        m='1rem 0rem'
        fontSize='1.2rem'
        lineHeight='1.3em'
        fontWeight='600'
        textAlign='center'
        color='hsla(261, 64%, 18%, 1)'
      >
        {props.value}
      </Text>
    )
  }

  return (
    <>
      {isOpen && <EditableInputModal {...inputProps} onClose={onClose} />}
      <Flex
        w='60%'
        my='1rem'
        justifyContent='center'
        animation={isEditMode && `${wiggle} infinite .15s linear`}
      >
        {isEditMode && (
          <RemoveButton
            title={inputProps.title}
            onRemove={() => inputProps.onSubmit(inputProps.type === 'text' ? '' : null)}
            isLoading={inputProps.loading}
          />
        )}
        <Button
          variant='editable-input'
          w='100%'
          maxW='unset'
          fontSize='1.2rem'
          textAlign='center'
          fontWeight='600'
          onClick={onOpen}
        >
          {props.value}
        </Button>
      </Flex>
    </>
  )
}

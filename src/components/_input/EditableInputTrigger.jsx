import {
  Text,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import EditableInputModal from 'components/_input/EditableInputModal'

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
      <Button
        onClick={onOpen}
        w='60%'
        m='1rem 0rem'
        fontSize='1.2rem'
        lineHeight='1.3em'
        fontWeight='600'
        textAlign='center'
        variant='editable-input'
        animation={`${wiggle} infinite .15s linear`}
      >
        {props.value}
      </Button>
    </>
  )
}

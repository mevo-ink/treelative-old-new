import {
  Flex,
  Text,
  Button,
  keyframes,
  useDisclosure,
  createStandaloneToast
} from '@chakra-ui/react'

import { format } from 'date-fns'
import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import RemoveButton from 'components/_input/RemoveButton'
import DateTimePickerModal from 'components/_input/DateTimePickerModal'

import 'react-datepicker/dist/react-datepicker.css'

const toast = createStandaloneToast()

export default function DateTimePickerDialogTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const dt = new Date(props.value)
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)

  const {
    reset,
    onChange,
    fontSize,
    defaultIsOpen = false,
    ...rest
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen })

  const handleClose = () => {
    reset && reset()
    onClose()
    defaultIsOpen && rest.onClose()
  }

  const handleOnSubmit = async (newValue) => {
    try {
      onChange(newValue)
        .then(result => {
          if (result.data) {
            toast({
              title: 'Successfully Date Updated',
              status: 'success',
              position: 'top',
              duration: 3000,
              isClosable: true
            })
            onClose()
            defaultIsOpen && rest.onClose(true)
          }
        })
        .catch(console.log)
    } catch (e) {
      if (!(onChange instanceof Promise)) {
        onClose()
      }
      console.log(e.message)
    }
  }

  if (!isEditMode) {
    return (
      <Text variant='info'>
        {props.value ? format(dtDateOnly, 'PP').replace(/[, ]+/g, '/') : 'Unavailable'}
      </Text>
    )
  }

  return (
    <Flex w='90%' justifyContent='center' animation={`${wiggle} infinite .15s linear`}>
      {isOpen && <DateTimePickerModal {...rest} onClose={handleClose} onSubmit={handleOnSubmit} />}
      <Flex justifyContent='center' position='relative'>
        {isEditMode && <RemoveButton inputProps={{ onSubmit: handleOnSubmit, name: rest.name, value: rest.value }} />}
        <Button
          onClick={onOpen}
          variant='editable-input'
        >
          {props.value ? format(dtDateOnly, 'PP').replace(/[, ]+/g, '/') : 'Unavailable'}
        </Button>
      </Flex>
    </Flex>
  )
}

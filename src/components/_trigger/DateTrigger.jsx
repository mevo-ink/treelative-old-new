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

import DateModal from 'components/_modal/DateModal'
import RemoveButton from 'components/_common/RemoveButton'

const toast = createStandaloneToast()

export default function DateTimePickerDialogTrigger (props) {
  const {
    title,
    value,
    editDate,
    editDateResult,
    defaultIsOpen
  } = props

  const isEditMode = useRecoilValue(isEditModeAtom)

  const dt = new Date(value)
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen })

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const handleEditDate = async (newValue) => {
    return editDate(newValue)
      .then(() => {
        toast({
          title: 'Successfully Date Updated',
          status: 'success',
          position: 'top',
          duration: 3000,
          isClosable: true
        })
        onClose()
      })
      .catch(console.log)
  }

  if (defaultIsOpen) {
    return isOpen ? <DateModal title={title} value={value} onClose={onClose} onSubmit={handleEditDate} isLoading={editDateResult?.isLoading} /> : null
  }

  if (!isEditMode) {
    return (
      <Text variant='info'>
        {value ? format(dtDateOnly, 'PP').replace(/[, ]+/g, '/') : 'Unavailable'}
      </Text>
    )
  }

  return (
    <Flex w='90%' justifyContent='center' animation={`${wiggle} infinite .15s linear`}>
      {isOpen && <DateModal title={title} value={value} onClose={onClose} onSubmit={handleEditDate} isLoading={editDateResult?.isLoading} />}
      <Flex justifyContent='center' position='relative'>
        {isEditMode && value && <RemoveButton title={'Remove' + title.substring(4)} onRemove={handleEditDate} isLoading={editDateResult?.isLoading} />}
        <Button onClick={onOpen} variant='editable-input'>
          {value ? format(dtDateOnly, 'PP').replace(/[, ]+/g, '/') : 'Unavailable'}
        </Button>
      </Flex>
    </Flex>
  )
}

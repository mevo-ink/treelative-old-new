import {
  Icon,
  Flex,
  Text,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import InputModal from 'components/_modal/InputModal'
import RemoveButton from 'components/_common/RemoveButton'

export default function InputTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const {
    name,
    title,
    value,
    onSubmit,
    isLoading,
    notRemovable,
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
        {value}
      </Text>
    )
  }

  return (
    <>
      {isOpen && <InputModal onClose={onClose} title={title} name={name} value={value} onSubmit={onSubmit} isLoading={isLoading} {...inputProps} />}
      <Flex
        w='60%'
        my={name === 'fullName' && '1rem'}
        justifyContent='center'
        animation={isEditMode && `${wiggle} infinite .15s linear`}
      >
        {isEditMode && !notRemovable && value && (
          <RemoveButton
            title={title}
            onRemove={onSubmit}
            isLoading={isLoading}
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
          {value}
          {!value && <Icon as={MdAdd} w='20px' h='20px' />}
        </Button>
      </Flex>
    </>
  )
}

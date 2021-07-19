import {
  Flex,
  Image,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import EditableInputModal from 'components/_input/EditableInputModal'

export default function EditableInputWithIconTrigger (props) {
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

  const handleClick = () => {
    if (isEditMode) onOpen()
    else console.log('What Are We Going To Do OnClick?')
  }

  return (
    <>
      {isOpen && <EditableInputModal {...inputProps} onClose={onClose} />}
      <Flex justifyContent='center' animation={isEditMode && `${wiggle} infinite .15s linear`}>
        <Image
          src={props.icon}
          h='100%'
          objectFit='contain'
          p='.4em'
          background='hsla(0, 0%, 100%, .2)'
          boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
          borderLeftRadius='999px'
        />
        <Button
          variant='editable-input'
          maxW='200px'
          mt='0'
          fontSize='14px'
          borderLeftRadius='unset'
          onClick={handleClick}
        >
          {props.value}
        </Button>
      </Flex>
    </>
  )
}

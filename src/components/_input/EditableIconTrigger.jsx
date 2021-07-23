import {
  Image,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import EditableInputModal from 'components/_input/EditableInputModal'
import RemoveButton from 'components/_input/RemoveButton'

export default function EditableIconTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const { icon, url, ...inputProps } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClick = (social) => {
    if (isEditMode) onOpen()
    else window.open(social, '_blank').focus()
  }

  return (
    <>
      {isOpen && <EditableInputModal {...inputProps} onClose={onClose} />}
      <Button
        p='0'
        onClick={() => handleClick(url)}
        isDisabled={!isEditMode && !url}
        m='1rem 0'
      >
        {isEditMode && <RemoveButton inputProps={inputProps} />}
        <Image
          src={icon}
          w='40px'
          objectFit='contain'
          filter={!url && 'grayscale(100%)'}
          animation={isEditMode && `${wiggle} infinite .15s linear`}
        />
      </Button>
    </>
  )
}

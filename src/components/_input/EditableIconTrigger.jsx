import {
  Grid,
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
      <Grid m='.3rem 0' placeItems='center' animation={isEditMode && `${wiggle} infinite .15s linear`}>
        {isEditMode && <RemoveButton inputProps={inputProps} />}
        <Button
          p='0'
          h='3.2rem'
          onClick={() => handleClick(url)}
          isDisabled={!isEditMode && !url}
        >
          <Image
            src={icon}
            w='40px'
            objectFit='contain'
            filter={!url && 'grayscale(100%)'}
          />
        </Button>
      </Grid>
    </>
  )
}

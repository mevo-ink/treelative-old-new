import {
  Grid,
  Image,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import InputModal from 'components/_modal/InputModal'
import RemoveButton from 'components/_common/RemoveButton'

export default function IconTrigger (props) {
  const {
    icon,
    title,
    url,
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

  const handleClick = (social) => {
    if (isEditMode) onOpen()
    else window.open(social, '_blank').focus()
  }

  return (
    <>
      {isOpen && <InputModal title={title} onSubmit={onSubmit} isLoading={isLoading} onClose={onClose} {...inputProps} />}
      <Grid m='.5rem' placeItems='center' animation={isEditMode && `${wiggle} infinite .15s linear`}>
        {isEditMode && (
          <RemoveButton
            title={'Remove' + title.substring(4)}
            onRemove={onSubmit}
            isLoading={isLoading}
          />
        )}
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

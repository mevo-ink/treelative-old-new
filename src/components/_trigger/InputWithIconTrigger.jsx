import {
  Flex,
  Image,
  Button,
  keyframes,
  useDisclosure
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import InputModal from 'components/_modal/InputModal'
import RemoveButton from 'components/_common/RemoveButton'

export default function InputWithIconTrigger (props) {
  const {
    icon,
    title,
    baseURL,
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

  const handleClick = () => {
    if (isEditMode) onOpen()
    else window.location.href = baseURL + props.value
  }

  return (
    <>
      {isOpen && <InputModal title={title} onSubmit={onSubmit} isLoading={isLoading} onClose={onClose} {...inputProps} />}
      <Flex w='100%' justifyContent='center' animation={isEditMode && `${wiggle} infinite .15s linear`}>
        <Flex w='auto' maxW='90%' p='.3rem' justify='center' position='relative'>
          <Image
            src={icon}
            h='100%'
            objectFit='contain'
            p='.4em'
            background='hsla(0, 0%, 100%, .2)'
            boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
            borderLeftRadius='999px'
          />
          {isEditMode && props.value && (
            <RemoveButton
              title={'Remove' + title.substring(4)}
              onRemove={onSubmit}
              isLoading={isLoading}
            />
          )}
          <Button
            variant='editable-input'
            mt='0'
            fontSize='14px'
            borderLeftRadius='unset'
            onClick={handleClick}
          >
            {props.value ? props.value : 'Unavailable'}
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

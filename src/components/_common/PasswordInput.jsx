import { forwardRef, useRef } from 'react'

import {
  Input,
  IconButton,
  InputGroup,
  useMergeRefs,
  useDisclosure,
  InputRightElement
} from '@chakra-ui/react'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export default forwardRef((props, ref) => {
  const { isOpen, onToggle } = useDisclosure()

  const inputRef = useRef()
  const mergeRef = useMergeRefs(inputRef, ref)

  const onClickReveal = () => {
    onToggle()
    const input = inputRef.current
    if (input) {
      input.focus({ preventScroll: true })
      const length = input.value.length * 2
      window.requestAnimationFrame(() => {
        input.setSelectionRange(length, length)
      })
    }
  }

  return (
    <InputGroup>
      <Input
        {...props}
        ref={mergeRef}
        type={isOpen ? 'text' : 'password'}
        autoComplete='current-password'
        required
      />
      <InputRightElement mt={props.size === 'lg' ? '1' : '0'} mr='1'>
        <IconButton
          bg='transparent !important'
          variant='ghost'
          aria-label={isOpen ? 'Mask password' : 'Reveal password'}
          icon={isOpen ? <HiEyeOff /> : <HiEye />}
          onClick={onClickReveal}
          tabIndex='-1'
        />
      </InputRightElement>
    </InputGroup>
  )
})

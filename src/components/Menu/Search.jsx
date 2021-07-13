import {
  Input,
  InputGroup,
  InputLeftAddon
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

export default function Search () {
  return (
    <InputGroup h='2rem'>
      <InputLeftAddon
        h='100%'
        bg='hsla(220, 98%, 57%, 1)'
        borderRadius='999px'
      >
        <BsSearch />
      </InputLeftAddon>
      <Input
        w='78%'
        h='100%'
        color='hsla(225, 36%, 4%, 1)'
        bg='hsla(0, 0%, 100%, .95)'
        borderRadius='999px'
        placeholder='Search'
        _placeholder={{ color: 'hsla(225, 36%, 4%, 1)' }}
      />
    </InputGroup>
  )
}

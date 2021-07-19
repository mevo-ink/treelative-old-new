import {
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

export default function Search ({ admin }) {
  return (
    <InputGroup h='2rem' w={admin ? '65%' : '85%'}>
      <InputRightElement
        h='100%'
        border='none'
        color='hsla(0, 0%, 100%, 1)'
      >
        <BsSearch />
      </InputRightElement>
      <Input
        h='100%'
        pb='2px'
        color='hsla(0, 0%, 100%, 1)'
        bg='hsla(0, 0%, 100%, .3)'
        border='none'
        borderRadius='999px'
        placeholder='Search'
        _placeholder={{ color: 'hsla(0, 0%, 100%, 1)' }}
      />
    </InputGroup>
  )
}

import { useState } from 'react'

import {
  Box,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'

import SearchResult from 'components/Menu/SearchResult'

export default function Search ({ role, onClose }) {
  const [searchInput, setSearchInput] = useState()
  return (
    <Box w={role === 'ADMIN' ? '65%' : role === 'USER' ? '75%' : '100%'}>
      <InputGroup w='100%' h='2rem'>
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
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </InputGroup>
      {searchInput && <SearchResult onClose={onClose} />}
      {searchInput && <SearchResult onClose={onClose} />}
      {searchInput && <SearchResult onClose={onClose} />}
      {searchInput && <SearchResult onClose={onClose} />}
      {searchInput && <SearchResult onClose={onClose} />}
    </Box>
  )
}

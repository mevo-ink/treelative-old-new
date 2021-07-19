import { useRef } from 'react'

import { Flex, Text, Image } from '@chakra-ui/react'

import { useQuery } from 'urql'
import { useSetRecoilState } from 'recoil'

import { activeNodeIDAtom } from 'utils/atoms.js'
import { GET_AGE_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

export default function Age () {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_AGE_DATA })

  const scrollRef = useRef(null)
  const handleHorizontalScroll = e => {
    scrollRef.current.scrollTo({ top: 0, left: scrollRef.current.scrollLeft + e.deltaY })
  }

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  const handleUserSelect = (userID) => {
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  return (
    <Flex
      ref={scrollRef}
      h='100vh'
      overflowY='hidden'
      overflowX='scroll'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
      onWheel={handleHorizontalScroll}
    >
      {Object.entries(result.data.getAgeData).map(([year, users]) =>
        <Flex key={year} direction='column' mx='2' id={year}>
          <Text fontWeight='800' fontSize='xl' textAlign='center'>{users.length}</Text>
          <Text fontWeight='600'>{year}</Text>
          {users.map(user => (
            <Image
              key={user.id}
              boxSize='40px'
              src={user.image}
              alt='children-avatar'
              objectFit='contain'
              borderRadius='50%'
              fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
              onClick={() => handleUserSelect(user.id)}
              my='1'
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

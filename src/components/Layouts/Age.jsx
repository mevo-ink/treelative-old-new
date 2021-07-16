import { useQuery } from 'urql'
import { GET_AGE_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

import {
  Flex,
  Text,
  Image
} from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

export default function Age () {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_AGE_DATA })

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  // TODO: ACTUAL STYLING WITH HORIZONTAL SCROLLING AND TIMELINE

  return (
    <Flex h='100vh' overflowY='hidden' overflowX='scroll'>
      {Object.entries(result.data.getAgeData).map(([year, users]) =>
        <Flex key={year} direction='column' mx='2'>
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
              onClick={() => setActiveNodeID(user.id)}
              my='1'
            />
          ))}
        </Flex>
      )}
    </Flex>
  )
}

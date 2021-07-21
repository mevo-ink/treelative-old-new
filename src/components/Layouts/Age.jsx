import { useEffect } from 'react'

import {
  Box,
  Flex,
  Text,
  Image,
  Divider
} from '@chakra-ui/react'

import { useQuery } from 'urql'
import { useSetRecoilState } from 'recoil'

import { activeNodeIDAtom, layoutMethodsAtom } from 'utils/atoms.js'
import { GET_AGE_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

export default function Age () {
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result, refetch] = useQuery({ query: GET_AGE_DATA })

  useEffect(() => {
    setLayoutMethods({
      refetch: () => {
        refetch({ requestPolicy: 'network-only' })
      }
    }) // eslint-disable-next-line
  }, [result.data])

  // const scrollRef = useRef(null)
  // const handleHorizontalScroll = e => {
  //   scrollRef.current.scrollTo({ top: 0, left: scrollRef.current.scrollLeft + e.deltaY })
  // }

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  const handleUserSelect = (userID) => {
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  console.log(result)

  return (
    <Flex
      h='100vh'
      flexDirection='column'
      overflowY='scroll'
      overflowX='hidden'
      bg='hsla(0, 0%, 0%, .75)'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
    >
      {Object.entries(result.data.getAgeData).map(([year, users]) =>
        <Flex
          key={year}
          id={year}
          alignItems='center'
          position='relative'
        >
          <Box
            w='11px'
            h='11px'
            position='absolute'
            left='4rem'
            bg='hsla(0, 0%, 100%, .7)'
            borderRadius='50%'
          />
          <Text
            px='.5em'
            color='hsla(0, 0%, 100%, .9)'
            bg='hsla(343, 100%, 40%, 1)'
            fontWeight='600'
            borderRadius='0 5px 5px 0'
            boxShadow='1px 3px 5px hsla(0, 0%, 0%, .5)'
          >
            {year === 'Unknown' ? '0000' : year}
          </Text>
          <Divider orientation='vertical' mx='1rem' py='40px' />
          <Flex
            overflowX='scroll'
            sx={{
              '::-webkit-scrollbar': { height: '2px' },
              '::-webkit-scrollbar-thumb': { background: 'hsla(343, 100%, 40%, 1)' }
            }}
          >
            {users.map(user => (
              <Image
                key={user.id}
                src={user.avatar}
                fallbackSrc={user.brokenAvatar}
                alt='children-avatar'
                w='40px'
                mx='.5rem'
                objectFit='contain'
                borderRadius='50%'
                onClick={() => handleUserSelect(user.id)}
                my='1'
              />
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

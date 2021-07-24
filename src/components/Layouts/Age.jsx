import { useEffect } from 'react'

import {
  Box,
  Flex,
  Icon,
  Text,
  Image,
  Divider,
  keyframes
} from '@chakra-ui/react'
import { FaSkullCrossbones } from 'react-icons/fa'

import { useQuery } from 'urql'
import { useRecoilState, useSetRecoilState } from 'recoil'

import { activeNodeIDAtom, activeNodePulseIDAtom, layoutMethodsAtom } from 'utils/atoms.js'
import { GET_AGE_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

export default function Age () {
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [activeNodePulseID, setactiveNodePulseID] = useRecoilState(activeNodePulseIDAtom)

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
    setactiveNodePulseID(userID)
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  const pulse = keyframes`
    0% { transform: scale(0.1, 0.1); opacity: 0; }
    50% { opacity: 1;)
    100% { transform: scale(1.5, 1.5); opacity: 0;
  `

  return (
    <Flex
      h='calc(100 * var(--vh))'
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
            {year}
          </Text>
          <Divider orientation='vertical' mx='1rem' my='40px' />
          <Flex
            overflow='visible'
            overflowX='scroll'
            sx={{
              '::-webkit-scrollbar': { height: '2px' },
              '::-webkit-scrollbar-thumb': { background: 'hsla(343, 100%, 40%, 1)' }
            }}
          >
            {users.map(user => (
              <Flex key={user.id} position='relative'>
                <Image
                  src={user.avatar}
                  fallbackSrc={user.brokenAvatar}
                  alt='children-avatar'
                  w='40px'
                  h='40px'
                  mx='.5rem'
                  objectFit='contain'
                  borderRadius='50%'
                  my='1'
                  zIndex='1'
                  onClick={() => handleUserSelect(user.id)}
                />
                {user.id === activeNodePulseID && (
                  <Box
                    borderRadius='50%'
                    position='absolute'
                    left='50%'
                    top='50%'
                    zIndex='0'
                    transform='translate(-20px, -20px)'
                    _after={{
                      content: '""',
                      borderRadius: '50%',
                      w: '40px',
                      h: '40px',
                      position: 'absolute',
                      animation: `${pulse} 1.5s infinite ease-out`,
                      opacity: '0',
                      boxShadow: '0 0 1px 10px hsla(100, 98%, 57%, 1)'
                    }}
                  />
                )}
                {user.dateOfDeath && (
                  <Icon
                    as={FaSkullCrossbones}
                    w='20px'
                    h='20px'
                    p='2px'
                    position='absolute'
                    right='0'
                    zIndex='1'
                    color='hsla(0, 0%, 0%, 1)'
                    bg='hsla(0, 0%, 100%, 1)'
                    borderRadius='50%'
                    boxShadow='0px 3px 5px hsla(0, 0%, 0%, .8)'
                  />
                )}
              </Flex>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

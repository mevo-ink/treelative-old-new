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
import { GET_BIRTHDAY_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

export default function Birthday () {
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result, refetch] = useQuery({ query: GET_BIRTHDAY_DATA })

  useEffect(() => {
    if (!result.data) return
    setLayoutMethods({
      refetch: () => {
        refetch({ requestPolicy: 'network-only' })
      }
    })
    const date = new Date()
    while (!result.data?.getBirthdayData[date.toString().slice(4, 10)]) {
      date.setDate(date.getDate() + 1)
    }
    document.getElementById(date.toString().slice(4, 10)).scrollIntoView({ behavior: 'smooth', block: 'center' })
    // eslint-disable-next-line
  }, [result.data])

  // useEffect(() => {
  //   // setTimeout(() => { document.getElementById(date.toString().slice(4, 10)).scrollIntoView({ behavior: 'smooth', block: 'center' }) }, 2000)
  //   // eslint-disable-next-line
  // }, [])

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  const handleUserSelect = (userID) => {
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  return (
    <Flex
      h='calc(100 * var(--vh))'
      flexDirection='column'
      overflowY='scroll'
      overflowX='hidden'
      bg='hsla(0, 0%, 0%, .75)'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
    >
      {Object.entries(result.data.getBirthdayData).map(([dob, users]) =>
        <Flex
          key={dob}
          id={dob}
          alignItems='center'
          position='relative'
        >
          <Box
            w='11px'
            h='11px'
            position='absolute'
            left='4.2rem'
            bg='hsla(0, 0%, 100%, .7)'
            borderRadius='50%'
          />
          <Text
            w='6ch'
            px='.5em'
            color='hsla(0, 0%, 100%, .9)'
            bg='hsla(343, 100%, 40%, 1)'
            fontWeight='600'
            borderRadius='0 5px 5px 0'
            textAlign='center'
            boxShadow='1px 3px 5px hsla(0, 0%, 0%, .5)'
          >
            {dob.slice(0, 3)} <br /> {dob.substring(3)}
          </Text>
          <Divider orientation='vertical' mx='1rem' my='40px' />
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
                src={user.image}
                alt='children-avatar'
                w='40px'
                mx='.5rem'
                objectFit='contain'
                borderRadius='50%'
                fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
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

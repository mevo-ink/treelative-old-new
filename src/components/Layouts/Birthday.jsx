import { useEffect } from 'react'

import {
  Box,
  Flex,
  Text,
  Image,
  Divider
} from '@chakra-ui/react'

import { useQuery } from 'urql'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { activeNodeIDAtom, layoutMethodsAtom, activeNodePulseIDAtom } from 'utils/atoms.js'
import { GET_BIRTHDAY_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'
import ActivePulse from 'components/Layouts/ActivePulse'

export default function Birthday () {
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result, refetch] = useQuery({ query: GET_BIRTHDAY_DATA })

  const [activeNodePulseID, setActiveNodePulseID] = useRecoilState(activeNodePulseIDAtom)

  useEffect(() => {
    if (!result.data) return
    setLayoutMethods({
      refetch: () => {
        refetch({ requestPolicy: 'network-only' })
      }
    })
    const date = new Date()
    while (!result.data?.getBirthdayData[date.toISOString().slice(5, 10)]) {
      date.setDate(date.getDate() + 1)
    }
    document.getElementById(date.toISOString().slice(5, 10)).scrollIntoView({ behavior: 'smooth', block: 'center' })
    // eslint-disable-next-line
  }, [result.data])

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  const handleUserSelect = (userID) => {
    setActiveNodePulseID(userID)
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // const getElementsInArea = (docElm => {
  //   let viewportHeight = docElm.clientHeight
  //   return (e, opts) => {
  //     const found = []
  //     let i
  //     if (e && e.type === 'resize') { viewportHeight = docElm.clientHeight }
  //     for (i = opts.elements.length; i--;) {
  //       const elm = opts.elements[i]
  //       const pos = elm.getBoundingClientRect()
  //       const topPerc = pos.top / viewportHeight * 100
  //       const bottomPerc = pos.bottom / viewportHeight * 100
  //       const middle = (topPerc + bottomPerc) / 2
  //       const inViewport = middle > opts.zone[1] &&
  //       middle < (100 - opts.zone[1])
  //       elm.classList.toggle(opts.markedClass, inViewport)
  //       if (inViewport) {
  //         found.push(elm)
  //         elm.style.border = '1px solid rgba(255, 255, 255, .2)'
  //       }
  //     }
  //   }
  // })(document.documentElement)

  // window.addEventListener('resize', f)

  // function f (e) {
  //   getElementsInArea(e, {
  //     elements: document.getElementById('container').getElementsByTagName('div'),
  //     markedClass: 'active-div',
  //     zone: [45, 45] // percentage distance from top & bottom
  //   })
  // }

  return (
    <Flex
      id='container'
      h='100vh'
      flexDirection='column'
      overflowY='scroll'
      overflowX='hidden'
      bg='hsla(0, 0%, 0%, .75)'
      sx={{ '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}
      // onWheel={f}
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
            {months[parseInt(dob.slice(0, 2) - 1, 10)]} <br /> {dob.substring(3)}
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
                {user.id === activeNodePulseID && <ActivePulse />}
                <Text
                  w='20px'
                  h='20px'
                  display='grid'
                  placeItems='center'
                  position='absolute'
                  right='0'
                  zIndex='1'
                  fontSize='12px'
                  bg='hsla(310, 100%, 40%, 1)'
                  borderRadius='50%'
                  boxShadow='0px 3px 5px hsla(0, 0%, 0%, .8)'
                >
                  {user.age}
                </Text>
              </Flex>
            ))}
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

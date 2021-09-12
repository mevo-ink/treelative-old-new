import { useRouter } from 'next/router'

import { parseCookies } from 'nookies'

import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { getMapData } from 'graphql/server/resolvers/queries/layouts/getMapData'
import { getMapData as getMapDataQueryFn } from 'graphql/client/queries/layouts'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { layoutMethodsAtom, activeNodePulseIDAtom } from 'utils/atoms.js'

import { Box, Text } from '@chakra-ui/react'

import Image from 'next/image'
import Wrapper from 'components/Wrapper'
import ErrorModal from 'components/_common/ErrorModal'
import ActivePulse from 'components/_common/ActivePulse'

import blurImagePlaceholder from 'utils/blurImagePlaceholder'

import GoogleMapReact from 'google-map-react'
import { mapStyles } from 'utils/layouts'

export async function getServerSideProps () {
  // pre-fetch the layout data
  const queryClient = new QueryClient()
  const mapData = await getMapData()
  queryClient.setQueryData('getMapData', mapData)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default function Map () {
  const router = useRouter()

  const queryClient = useQueryClient()

  const { data, error } = useQuery('getMapData', getMapDataQueryFn)

  const [activeNodePulseID, setActiveNodePulseID] = useRecoilState(activeNodePulseIDAtom)
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const { AUTH_SESSION_USER: authUserID } = parseCookies()

  // center on auth user if location is available - else center on Sri Lanka
  const sriLanka = { lat: 10.99835602, lng: 77.01502627 }
  const defaultCenter = (authUserID && data.users.find(user => user.id === authUserID)?.position) || sriLanka

  if (error) {
    return <ErrorModal> {error.message} </ErrorModal>
  }

  return (
    <Wrapper>
      <Box h='calc(100 * var(--vh))'>
        <Text
          w='100%'
          position='absolute'
          zIndex='10'
          p='.5rem'
          fontSize='.8rem'
          textAlign='end'
          opacity='.8'
        >
          Users without data: {data.unknownCount}
        </Text>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_LOCATION_API_KEY }}
          defaultCenter={defaultCenter}
          defaultZoom={4}
          options={{ styles: mapStyles, fullscreenControl: false, zoomControl: false }}
          onGoogleApiLoaded={({ map }) => {
            setLayoutMethods({
              findUser: (user) => {
                if (!user.currentLocation) return null
                const { position } = data.users.find(({ id }) => id === user.id)
                map.panTo(position)
                setActiveNodePulseID(user.id)
                return true
              },
              refetch: async () => {
                await queryClient.resetQueries('getMapData')
              }
            })
          }}
        >
          {data.users.map(user => (
            <Box
              key={user.id}
              position='relative'
              lat={user.position.lat}
              lng={user.position.lng}
              boxSize='40px'
              zIndex={[activeNodePulseID, authUserID].includes(user.id) ? '4' : '2'}
            >
              <Image
                src={user.avatar}
                layout='fill'
                objectFit='contain'
                className='avatar'
                placeholder='blur'
                blurDataURL={blurImagePlaceholder(40, 40)}
                onClick={() => router.push(`?userID=${user.id}`, `/users/${user.id}`, { shallow: true, scroll: false })}
              />
              <style jsx global>
                {`
                  .avatar {
                    border-radius: 50%;
                  }
                `}
              </style>
              {user.id === activeNodePulseID && <ActivePulse />}
            </Box>
          ))}
        </GoogleMapReact>
      </Box>
    </Wrapper>
  )
}

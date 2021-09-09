import { useRouter } from 'next/router'

import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { getMapData } from 'graphql/server/resolvers/queries/layouts/getMapData'
import { getMapData as getMapDataQueryFn } from 'graphql/client/queries/layouts'

import Wrapper from 'components/Wrapper'
import ErrorModal from 'components/_common/ErrorModal'

import { Box, Image, Text } from '@chakra-ui/react'

import GoogleMapReact from 'google-map-react'

// https://developers.google.com/maps/documentation/javascript/examples/style-array
const styles = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  {
    featureType: 'administrative.locality',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry',
    stylers: [{ color: '#263c3f' }]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#6b9a76' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#38414e' }]
  },
  {
    featureType: 'road',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#212a37' }]
  },
  {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#9ca5b3' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{ color: '#746855' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ color: '#1f2835' }]
  },
  {
    featureType: 'road.highway',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#f3d19c' }]
  },
  {
    featureType: 'transit',
    elementType: 'geometry',
    stylers: [{ color: '#2f3948' }]
  },
  {
    featureType: 'transit.station',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#d59563' }]
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#17263c' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{ color: '#515c6d' }]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#17263c' }]
  }
]

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

  const { data, error } = useQuery('getMapData', getMapDataQueryFn)

  const authUserID = '' // TODO: get from auth

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
          options={{ styles, fullscreenControl: false, zoomControl: false }}
          // onGoogleApiLoaded={({ map }) => {
          //   setMapMethods({
          //     panTo: (userID) => {
          //       const position = data.users.find(user => user.id === userID)?.position
          //       position && map.panTo(position)
          //       return position
          //     }
          //   })
          //   setLayoutMethods({
          //     refetch: () => {
          //       refetch({ requestPolicy: 'network-only' })
          //     }
          //   })
          // }}
        >
          {data.users.map(user => (
            <Box
              key={user.id}
              position='relative'
              lat={user.position.lat}
              lng={user.position.lng}
            >
              <Image
                w='40px'
                h='40px'
                src={user.image}
                alt='avatar'
                objectFit='contain'
                borderRadius='50%'
                position='absolute'
                // zIndex={(user.id === activeNodePulseID || user.id === authUserID) ? '4' : '2'}
                onClick={() => router.push(`?userID=${user.id}`, `/users/${user.id}`, { shallow: true, scroll: false })}
              />
              {/* {user.id === activeNodePulseID && <ActivePulse mapView />} */}
            </Box>
          ))}
        </GoogleMapReact>
      </Box>
    </Wrapper>
  )
}

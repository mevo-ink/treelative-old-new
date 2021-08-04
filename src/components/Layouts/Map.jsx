import { Box, Image } from '@chakra-ui/react'

import { useQuery } from 'urql'
import { useSetRecoilState, useRecoilState } from 'recoil'

import { GET_MAP_DATA } from 'graphql/queries/layouts'
import {
  layoutMethodsAtom,
  activeNodeIDAtom,
  mapMethodsAtom,
  activeNodePulseIDAtom
} from 'utils/atoms.js'

import GoogleMapReact from 'google-map-react'

import parseJwt from 'utils/parseJWT'
import Loading from 'components/Loading'
import ErrorModal from 'components/_common/ErrorModal'
import ActivePulse from 'components/_common/ActivePulse'

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

export default function Map () {
  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const setMapMethods = useSetRecoilState(mapMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [activeNodePulseID, setActiveNodePulseID] = useRecoilState(activeNodePulseIDAtom)

  const [result, refetch] = useQuery({ query: GET_MAP_DATA })

  const { _id: authUserID } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  // center on auth user if location is available - else center on Sri Lanka
  const sriLanka = { lat: 10.99835602, lng: 77.01502627 }
  const defaultCenter = (authUserID && result.data?.getMapData && result.data.getMapData.find(user => user.id === authUserID)?.position) || sriLanka

  if (result.error) {
    return (
      <ErrorModal>
        {result.error.message}
      </ErrorModal>
    )
  }

  if (result.fetching) return <Loading />

  const handleUserSelect = (userID) => {
    setActiveNodePulseID(userID)
    setActiveNodeID(userID)
  }

  return (
    <Box h='calc(100 * var(--vh))'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_LOCATION_API_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={4}
        options={{ styles, fullscreenControl: false, zoomControl: false }}
        onGoogleApiLoaded={({ map }) => {
          setMapMethods({
            panTo: (userID) => {
              const position = result.data.getMapData.find(user => user.id === userID)?.position
              position && map.panTo(position)
              return position
            }
          })
          setLayoutMethods({
            refetch: () => {
              refetch({ requestPolicy: 'network-only' })
            }
          })
        }}
      >
        {result.data.getMapData.map(user => (
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
              fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
              alt='children-avatar'
              objectFit='contain'
              borderRadius='50%'
              position='absolute'
              zIndex={(user.id !== activeNodePulseID) ? '1' : '2'}
              onClick={() => handleUserSelect(user.id)}
            />
            {user.id === activeNodePulseID && <ActivePulse mapView />}
          </Box>
        ))}
      </GoogleMapReact>
    </Box>
  )
}

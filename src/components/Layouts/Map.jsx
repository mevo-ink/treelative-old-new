import GoogleMapReact from 'google-map-react'

import { useQuery } from 'urql'
import { GET_MAP_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

import {
  Box,
  Image
} from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import { activeNodeIDAtom, mapMethodsAtom } from 'utils/atoms.js'

import parseJwt from 'utils/parseJWT'

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
  const setMapMethods = useSetRecoilState(mapMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_MAP_DATA })

  const { id: authUserID } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  // center on auth user if location is available - else center on Sri Lanka
  const defaultCenter = authUserID && result.data?.getMapData ? result.data.getMapData.known.find(user => user.id === authUserID)?.position : { lat: 10.99835602, lng: 77.01502627 }

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  const handleUserSelect = (userID) => {
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  return (
    <Box h='100vh'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_LOCATION_API_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={4}
        options={{ styles }}
        onGoogleApiLoaded={({ map }) => setMapMethods({
          panTo: (userID) => {
            const position = result.data.getMapData.known.find(user => user.id === userID)?.position
            position && map.panTo(position)
          }
        })}
      >
        {result.data.getMapData.known.map(user => (
          <Image
            key={user.id}
            boxSize='40px'
            position='absolute'
            lat={user.position.lat}
            lng={user.position.lng}
            src={user.image}
            alt='children-avatar'
            objectFit='contain'
            borderRadius='50%'
            fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
            onClick={() => handleUserSelect(user.id)}
          />
        ))}
      </GoogleMapReact>
    </Box>
  )
}

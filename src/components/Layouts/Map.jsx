import GoogleMapReact from 'google-map-react'

import { useQuery } from 'urql'
import { GET_MAP_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

import { Image } from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import parseJwt from 'utils/parseJWT'

export default function Map () {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_MAP_DATA })

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  const { id: authUserID } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  const defaultProps = {
    // center on auth user if location is available - else center on Sri Lanka
    center: authUserID ? result.data.getMapData.known.find(user => user.id === authUserID)?.position : { lat: 10.99835602, lng: 77.01502627 },
    zoom: 4
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_LOCATION_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
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
            onClick={() => setActiveNodeID(user.id)}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}

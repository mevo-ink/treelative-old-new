import { useState, useEffect } from 'react'

import GoogleMapReact from 'google-map-react'

import { useQuery } from 'urql'
import { GET_MAP_DATA } from 'graphql/queries/layouts'

import Loading from 'components/Loading'

import {
  Box,
  Image
} from '@chakra-ui/react'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { activeNodeIDAtom, findMeAtom } from 'utils/atoms.js'

import parseJwt from 'utils/parseJWT'

export default function Map () {
  const [findMe, setFindMe] = useRecoilState(findMeAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_MAP_DATA })

  const { id: authUserID } = parseJwt(window.localStorage.getItem('AUTH_SESSION_ID'))

  // center on auth user if location is available - else center on Sri Lanka
  const defaultCenter = authUserID && result.data?.getMapData ? result.data.getMapData.known.find(user => user.id === authUserID)?.position : { lat: 10.99835602, lng: 77.01502627 }

  // store reference to the map api
  const [map, setMap] = useState(defaultCenter)

  useEffect(() => {
    if (findMe) {
      map.panTo(defaultCenter)
      setFindMe(false)
    }
  }, [findMe])

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  return (
    <Box h='100vh'>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_LOCATION_API_KEY }}
        defaultCenter={defaultCenter}
        defaultZoom={4}
        onGoogleApiLoaded={({ map, maps }) => setMap(map)}
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
    </Box>
  )
}

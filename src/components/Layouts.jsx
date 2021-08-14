import { useEffect } from 'react'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { layoutAtom, activeNodeIDAtom } from 'utils/atoms.js'

import Map from 'components/Layouts/Map'
import Age from 'components/Layouts/Age'
import Graph from 'components/Layouts/Graph'
import Birthday from 'components/Layouts/Birthday'

export default function Layouts () {
  const layout = useRecoilValue(layoutAtom)
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  // show the profile card if url contains activeNodeID
  useEffect(() => {
    const activeNodeID = window.location.pathname.slice(1)
    // add event listener on activeNodeID url change
    const onLocationChange = () => {
      setActiveNodeID(window.location.pathname.slice(1))
    }
    window.addEventListener('popstate', onLocationChange)
    if (activeNodeID !== '/') {
      setTimeout(() => {
        setActiveNodeID(activeNodeID)
      }, 1)
    }
    return () => {
      window.removeEventListener('popstate', onLocationChange)
    }
    // eslint-disable-next-line
  }, [])

  switch (layout) {
    case 'map':
      return <Map />
    case 'age':
      return <Age />
    case 'birthday':
      return <Birthday />
    default:
      return <Graph />
  }
}

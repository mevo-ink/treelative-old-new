import { useEffect } from 'react'

import { useRecoilValue } from 'recoil'

import { layoutAtom } from 'utils/atoms.js'

import Map from 'components/Layouts/Map'
import Age from 'components/Layouts/Age'
import Graph from 'components/Layouts/Graph'
import Birthday from 'components/Layouts/Birthday'

import cookieCutter from 'cookie-cutter'

export default function Layouts ({ layout: initialValue }) {
  const layout = useRecoilValue(layoutAtom)

  useEffect(() => {
    layout && cookieCutter.set('layout', layout)
  }, [layout])

  switch (layout || initialValue) {
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

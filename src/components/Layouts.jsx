import { useRecoilValue } from 'recoil'
import { layoutAtom } from 'utils/atoms.js'

import Graph from 'components/Layouts/Graph'
import Map from 'components/Layouts/Map'
import Age from 'components/Layouts/Age'

export default function Layouts () {
  const layout = useRecoilValue(layoutAtom)

  switch (layout) {
    case 'map':
      return <Map />
    case 'age':
      return <Age />
    default:
      return <Graph />
  }
}

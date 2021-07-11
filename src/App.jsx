import { useQuery } from 'urql'
import { GET_NETWORK_DATA } from 'graphql/queries/networkData'

import { useRecoilValue } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Graph from 'components/Graph'
import ProfileCard from 'components/ProfileCard'
// import ProfileCardChumma from 'components/ProfileCardChumma'

export default function App () {
  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_NETWORK_DATA })

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <p>LOADING...</p>

  return (
    <>
      {activeNodeID && <ProfileCard />}
      <Graph networkData={result.data.getNetworkData} />
    </>
  )
}

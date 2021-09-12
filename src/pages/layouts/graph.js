import { useRouter } from 'next/router'

import { useState, useEffect, useRef } from 'react'

import { parseCookies } from 'nookies'

import { QueryClient, useQuery, useQueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { getGraphData } from 'graphql/server/resolvers/queries/layouts/getGraphData'
import { getGraphData as getGraphDataQueryFn } from 'graphql/client/queries/layouts'

import { useSetRecoilState } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import Wrapper from 'components/Wrapper'
import Loading from 'components/Loading'
import ErrorModal from 'components/_common/ErrorModal'

import { Network } from 'vis-network/peer/umd/vis-network.js'
import { graphOptions } from 'utils/layouts'

import { Box } from '@chakra-ui/react'

export async function getServerSideProps () {
  // pre-fetch the layout data
  const queryClient = new QueryClient()
  const graphData = await getGraphData()
  queryClient.setQueryData('getGraphData', graphData)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}

export default function Graph () {
  const router = useRouter()

  const queryClient = useQueryClient()

  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)

  const { data, error } = useQuery('getGraphData', getGraphDataQueryFn)

  const graphRef = useRef()

  const [isStabilized, setIsStabilized] = useState(false)

  const { AUTH_SESSION_USER: authUserID } = parseCookies()

  useEffect(() => {
    if (error) return
    const network = new Network(graphRef.current, data, graphOptions)
    // zoom on Graph mount
    network.on('stabilized', () => {
      const position = authUserID ? network.getPosition(authUserID) : null
      position && network.moveTo({
        position,
        scale: 0.8,
        animation: {
          duration: 500,
          easingFunction: 'easeInCubic'
        }
      })
      // set the layout methods
      setLayoutMethods({
        updateNode: (id, property, value) => {
          network.body.data.nodes.update({ id, [property]: value })
        },
        findUser: (user) => {
          const position = network.getPosition(user.id)
          network.moveTo({
            position,
            scale: 1,
            animation: {
              duration: 500,
              easingFunction: 'easeInCubic'
            }
          })
          return true
        },
        refetch: () => {
          queryClient.resetQueries('getGraphData')
        }
      })
      setIsStabilized(true)
    })
    // navigate to user profile on node click
    network.on('selectNode', ({ nodes }) => {
      network.unselectAll()
      const activeNode = data.nodes.find(node => nodes[0] === node.id)
      if (activeNode.group === 'individual') {
        router.push(`?userID=${activeNode.id}`, `/users/${activeNode.id}`, { shallow: true, scroll: false })
      }
    })
    // disable drag on node click
    network.on('dragStart', () => {
      network.unselectAll()
    })
    // limit the zoom
    const MIN_ZOOM = 0.1
    const MAX_ZOOM = 2.0
    let lastZoomPosition = { x: 0, y: 0 }
    network.on('zoom', () => {
      const scale = network.getScale()
      if (scale <= MIN_ZOOM) {
        network.moveTo({
          position: lastZoomPosition,
          scale: MIN_ZOOM
        })
      } else if (scale >= MAX_ZOOM) {
        network.moveTo({
          position: lastZoomPosition,
          scale: MAX_ZOOM
        })
      } else {
        lastZoomPosition = network.getViewPosition()
      }
    })
    // eslint-disable-next-line
  }, [])

  if (error) {
    return <ErrorModal> {error.message} </ErrorModal>
  }

  return (
    <Wrapper>
      {!isStabilized && <Loading />}
      <Box
        h='calc(100 * var(--vh))'
        ref={graphRef}
      />
    </Wrapper>
  )
}

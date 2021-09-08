import { useRouter } from 'next/router'

import { useState, useEffect, useRef } from 'react'

import { QueryClient } from 'react-query'
import { dehydrate } from 'react-query/hydration'

import { getGraphData } from 'graphql/server/resolvers/queries/layouts/getGraphData'

import Wrapper from 'components/Wrapper'
import Loading from 'components/Loading'
import ErrorModal from 'components/_common/ErrorModal'

import { Network } from 'vis-network/peer/umd/vis-network.js'

import { Box } from '@chakra-ui/react'

import { useGraphData } from 'graphql/client/queries/layouts'

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

const options = {
  layout: {
    improvedLayout: true
  },
  nodes: {
    borderWidth: 2,
    size: 25,
    font: { color: 'hsl(0, 0%, 100%)' }
  },
  edges: {
    hidden: false,
    arrows: { middle: true },
    chosen: false
  },
  groups: {
    individual: {
      shape: 'circularImage',
      color: {
        border: 'hsl(190, 84%, 44%)',
        highlight: {
          border: 'hsl(190, 84%, 44%)'
        }
      }
    },
    couple: {
      shape: 'circularImage',
      size: 18,
      image: '/images/coupleNode.png',
      color: {
        background: 'transparent',
        border: 'transparent',
        highlight: {
          border: 'transparent'
        }
      }
    },
    singleParent: {
      shape: 'circularImage',
      size: 8,
      image: '/images/singleParent.png',
      color: {
        background: 'transparent',
        border: 'transparent',
        highlight: {
          border: 'transparent'
        }
      }
    }
  }
}

export default function Graph () {
  const router = useRouter()

  const { data, error } = useGraphData()

  const graphRef = useRef()

  const [isStabilized, setIsStabilized] = useState(false)

  const authUserID = '' // TODO: get from auth

  useEffect(() => {
    if (error) return
    // set network in store
    const network = new Network(graphRef.current, data, options)
    // setNetworkMethods({
    //   updateNode: (id, property, value) => {
    //     network.body.data.nodes.update({ id, [property]: value })
    //   },
    //   unselectAll: () => network.unselectAll(),
    //   moveTo: (userID) => {
    //     const position = network.getPosition(userID)
    //     network.moveTo({
    //       position,
    //       scale: 1,
    //       animation: {
    //         duration: 3000,
    //         easingFunction: 'easeInCubic'
    //       }
    //     })
    //   },
    //   refetch: () => {
    //     refetch({ requestPolicy: 'network-only' })
    //   }
    // })
    // setLayoutMethods({
    //   refetch: () => {
    //     refetch({ requestPolicy: 'network-only' })
    //   }
    // })
    // zoom on Graph mount
    network.on('stabilized', () => {
      setIsStabilized(true)
      const position = authUserID ? network.getPosition(authUserID) : null
      network.moveTo({
        position,
        scale: 0.8,
        animation: {
          duration: 500,
          easingFunction: 'easeInCubic'
        }
      })
    })
    // disable node drag
    const clearSelection = function () { network.unselectAll() }
    network.on('dragStart', clearSelection)
    // set activeNodeID on user node click
    network.on('selectNode', ({ nodes }) => {
      network.unselectAll()
      const activeNode = data.nodes.find(node => nodes[0] === node.id)
      if (activeNode.group === 'individual') {
        router.push(`?userID=${activeNode.id}`, `/users/${activeNode.id}`, { shallow: true, scroll: false })
        // setActiveNodeID(activeNode.id)
      }
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

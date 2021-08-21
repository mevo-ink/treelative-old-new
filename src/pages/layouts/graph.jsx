import { useRouter } from 'next/router'

import { useState, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'

import { useQuery } from 'urql'
import { useSetRecoilState } from 'recoil'
import { Network } from 'vis-network/peer/umd/vis-network.js'

import { GET_NETWORK_DATA } from 'graphql/queries/layouts'
import { layoutMethodsAtom, networkMethodsAtom, activeNodeIDAtom } from 'utils/atoms.js'

import parseJwt from 'utils/parseJWT'
import Loading from 'components/Loading'
import ErrorModal from 'components/_common/ErrorModal'

import { withUrqlClient } from 'next-urql'
import client from 'graphql/client'

const Graph = () => {
  const router = useRouter()

  const { id: authUserID } = parseJwt()

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
        image: 'https://res.cloudinary.com/arun99-dev/image/upload/v1624878835/coupleNode_etlqzn.png',
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
        image: 'http://www.clker.com/cliparts/l/J/f/f/K/O/red-circle-no-background.svg.hi.png',
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

  const graphRef = useRef()

  const [isStabilized, setIsStabilized] = useState(false)

  const setLayoutMethods = useSetRecoilState(layoutMethodsAtom)
  const setNetworkMethods = useSetRecoilState(networkMethodsAtom)
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result, refetch] = useQuery({ query: GET_NETWORK_DATA })

  useEffect(() => {
    if (!result.data?.getNetworkData) return
    // set network in store
    const network = new Network(graphRef.current, result.data.getNetworkData, options)
    setNetworkMethods({
      updateNode: (id, property, value) => {
        network.body.data.nodes.update({ id, [property]: value })
      },
      unselectAll: () => network.unselectAll(),
      moveTo: (userID) => {
        const position = network.getPosition(userID)
        network.moveTo({
          position,
          scale: 1,
          animation: {
            duration: 3000,
            easingFunction: 'easeInCubic'
          }
        })
      },
      refetch: () => {
        refetch({ requestPolicy: 'network-only' })
      }
    })
    setLayoutMethods({
      refetch: () => {
        refetch({ requestPolicy: 'network-only' })
      }
    })
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
    network.on('selectNode', ({ nodes, event }) => {
      event.preventDefault()
      const activeNode = result.data?.getNetworkData.nodes.find(node => nodes[0] === node.id)
      if (activeNode.group !== 'couple') {
        router.push(`/profile/${activeNode.id}`)
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
  }, [result.data?.getNetworkData])

  if (result.error) {
    return (
      <ErrorModal>
        {result.error.message}
      </ErrorModal>
    )
  }

  if (result.fetching) return <Loading />

  return (
    <>
      {!isStabilized && <Loading />}
      <Box
        h='calc(100 * var(--vh))'
        ref={graphRef}
      />
    </>
  )
}

// populate initial data on server
Graph.getInitialProps = async (ctx) => ctx.urqlClient.query(GET_NETWORK_DATA).toPromise()

export default withUrqlClient(client)(Graph)
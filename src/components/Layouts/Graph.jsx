import { useState, useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

import { useSetRecoilState } from 'recoil'
import { networkMethodsAtom, activeNodeIDAtom } from 'utils/atoms.js'

import { Network } from 'vis-network/standalone'

import Loading from 'components/Loading'

import { useQuery } from 'urql'
import { GET_NETWORK_DATA } from 'graphql/queries/networkData'

export default function Graph () {
  const options = {
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
      admin: {
        shape: 'circularImage',
        borderWidth: 3,
        color: {
          border: 'hsl(54, 100%, 51%)',
          highlight: {
            border: 'hsl(54, 100%, 51%)'
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
      }
    }
  }

  const graphRef = useRef()

  const [isStabilized, setIsStabilized] = useState(false)

  const setNetworkMethods = useSetRecoilState(networkMethodsAtom)
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_NETWORK_DATA })

  useEffect(() => {
    if (!result.data?.getNetworkData) return
    // set network in store
    const network = new Network(graphRef.current, result.data?.getNetworkData, options)
    setNetworkMethods({
      unselectAll: () => network.unselectAll()
    })
    // get the node coordinates
    // const { x: nodeX, y: nodeY } = network.getPositions(['187e3fbf-347e-4e0d-9a82-b0b2cf2bc57f'])['187e3fbf-347e-4e0d-9a82-b0b2cf2bc57f']
    // zoom on Graph mount
    network.on('stabilized', () => {
      setIsStabilized(true)
      // stabilized.set(true)
      // network.focus('187e3fbf-347e-4e0d-9a82-b0b2cf2bc57f')
      network.moveTo({
        // position: { x: nodeX, y: nodeY },
        scale: 0.8,
        animation: {
          duration: 1000,
          easingFunction: 'easeInCubic'
        }
      })
    })
    // disable node drag
    const clearSelection = function () { network.unselectAll() }
    network.on('dragStart', clearSelection)
    // set activeNodeID on user node click
    network.on('selectNode', ({ nodes }) => {
      const activeNode = result.data?.getNetworkData.nodes.find(node => nodes[0] === node.id)
      if (activeNode.group !== 'couple') {
        setTimeout(() => setActiveNodeID(activeNode.id), 1)
      }
    })
    // limit the zoom
    const MIN_ZOOM = 0.3
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

  if (result.error) return <p>ERROR</p>

  if (result.fetching) return <Loading />

  return (
    <>
      {!isStabilized && <Loading />}
      <Box
        h='100vh'
        ref={graphRef}
      />
    </>
  )
}

import { useEffect, useState } from 'react'

import { Box, Flex, Image, Button } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

const MotionBox = motion(Box)

const enterExitAnimation = direction => {
  return {
    zIndex: 0,
    x: direction * 50,
    opacity: 0
  }
}

const variants = {
  enter: enterExitAnimation,
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: enterExitAnimation
}

const transition = {
  x: { type: 'spring', stiffness: 400, damping: 25 },
  opacity: { duration: 0.1 }
}

const swipeConfidenceThreshold = 10

const findNextPage = (slides, currentIndex, direction = 1) => {
  let nextIndex = (currentIndex + (1 * direction)) % slides.length
  if (nextIndex < 0) {
    nextIndex = (slides.length + nextIndex) % slides.length
  }
  if (slides[nextIndex].props.isHidden) {
    return findNextPage(slides, nextIndex, direction)
  }
  return nextIndex
}

export default function Slider ({ children = [] }) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const initialPage = children[0].props.isHidden ? findNextPage(children, 0, 1) : 0

  const [[page, direction], setPageDirection] = useState([initialPage, 1])

  useEffect(() => {
    !isEditMode && children[page].props.isHidden && setPageDirection([findNextPage(children, page, 1), direction])
    // eslint-disable-next-line
  }, [isEditMode])

  const swipePower = (offset, velocity) => Math.abs(offset) * velocity

  const onDragEnd = (_, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)
    const direction = swipe < -swipeConfidenceThreshold ? 1 : -1
    setPageDirection([findNextPage(children, page, direction), direction])
  }

  return (
    <>
      <Box
        w='100%'
        minH='285px'
        position='relative'
        display='grid'
        placeItems='center'
      >
        {[0, 1].map(idx => (
          <Box
            key={idx}
            w={`${90 - idx * 5}%`}
            minH='100%'
            position='absolute'
            background='hsla(0, 0%, 100%, .2)'
            boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
            borderRadius='20px'
          />
        ))}
        <AnimatePresence initial={false} custom={direction}>
          <MotionBox
            // framer props
            key={page}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={transition}
            drag='x'
            dragElastic={0.5}
            onDragEnd={onDragEnd}
            // additional props
            w='100%'
            h='100%'
            display='flex'
            justifyContent='center'
            position='absolute'
            borderRadius='20px'
          >
            {children[page]}
          </MotionBox>
        </AnimatePresence>
      </Box>
      <Flex
        justifyContent='space-between'
      >
        {children.map((child, idx) => (
          <Button
            key={idx + 10}
            w='1.5rem'
            h='1.5rem'
            minW='unset'
            p='unset'
            m='1.5rem .4rem'
            borderRadius='5px'
            background={child.props.isHidden ? 'hsla(0, 0%, 80%, .5)' : 'hsla(0, 0%, 100%, .5)'}
            border={idx === page ? '2px solid hsla(0, 0%, 100%, .75)' : 'none'}
            onClick={() => setPageDirection([idx, ''])}
          >
            <Image src={child.props.icon} w='100%' h='100%' p='.25rem' />
          </Button>
        ))}
      </Flex>
    </>
  )
}

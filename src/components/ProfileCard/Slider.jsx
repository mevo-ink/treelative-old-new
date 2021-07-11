import { useState } from 'react'

import {
  Box,
  Flex
} from '@chakra-ui/react'

import { motion, AnimatePresence } from 'framer-motion'

const MotionBox = motion(Box)

const variants = {
  enter: (direction) => {
    return {
      zIndex: 0,
      x: direction === 'left' ? 50 : -50,
      opacity: 0
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction === 'right' ? 50 : -50,
      opacity: 0
    }
  }
}

const transition = {
  x: { type: 'spring', stiffness: 400, damping: 25 },
  opacity: { duration: 0.1 }
}

const swipeConfidenceThreshold = 10

export default function Slider ({ children = [] }) {
  const filteredChildren = children.filter(slide => slide)

  const [[page, direction], setPageDirection] = useState([0, 'right'])

  const swipePower = (offset, velocity) => Math.abs(offset) * velocity

  const onDragEnd = (_, { offset, velocity }) => {
    const swipe = swipePower(offset.x, velocity.x)
    if (swipe < -swipeConfidenceThreshold) {
      setPageDirection([(page + 1) % filteredChildren.length, 'left'])
    } else if (swipe > swipeConfidenceThreshold) {
      if (page - 1 < 0) {
        setPageDirection([(filteredChildren.length + page - 1 % filteredChildren.length), 'right'])
      } else {
        setPageDirection([page - 1, 'right'])
      }
    }
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
            dragConstraints={{ left: 0, right: 0 }}
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
            {filteredChildren[page]}
          </MotionBox>
        </AnimatePresence>
      </Box>
      <Flex
        justifyContent='space-between'
      >
        {filteredChildren.map((_, idx) => (
          <Box
            key={idx + 10}
            w='.5rem'
            h='.5rem'
            m='1.5rem .2rem'
            borderRadius='50%'
            background={idx === page ? 'hsla(261, 64%, 18%, 1)' : 'hsla(0, 0%, 100%, .5)'}
            border={idx === page ? '1px solid hsla(0, 0%, 100%, .9)' : 'none'}
          />
        ))}
      </Flex>
    </>
  )
}

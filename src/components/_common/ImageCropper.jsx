import { useState, useCallback } from 'react'

import {
  Box,
  Flex,
  Modal,
  Slider,
  IconButton,
  SliderTrack,
  SliderThumb,
  ModalOverlay,
  ModalContent,
  SliderFilledTrack
} from '@chakra-ui/react'
import { MdZoomOutMap, MdDone, MdClose } from 'react-icons/md'

import { getCroppedImg } from 'utils/canvasUtils'

import Cropper from 'react-easy-crop'

export default function ImageCropper ({ image, onClose, setCroppedImage }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels), [])

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels)
      setCroppedImage(croppedImage)
      onClose()
    } catch (err) { console.log(err) }
  })

  return (
    <Modal isOpen isCentered>
      <ModalOverlay />
      <ModalContent h='550px' overflow='hidden'>
        <Box h='90%'>
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            cropShape='round'
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </Box>
        <Box
          mx='2rem'
          zIndex='1'
          textAlign='center'
          borderRadius='999px'
          bg='hsla(0, 0%, 100%, .5)'
        >
          <Slider
            aria-label='Crop Image Slider'
            w='90%'
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={val => setZoom(val)}
          >
            <SliderTrack bg='hsla(225, 40%, 2%, .3)'>
              <SliderFilledTrack bg='hsla(225, 40%, 2%, 1)' />
            </SliderTrack>
            <SliderThumb><Box color='hsla(225, 40%, 2%, 1)' as={MdZoomOutMap} /></SliderThumb>
          </Slider>
        </Box>
        <Flex
          w='100%'
          my='.6rem'
          justifyContent='center'
        >
          <IconButton
            variant='submit'
            aria-label='Crop Done Button'
            icon={<MdDone />}
            mx='.5rem'
            borderRadius='999px'
            onClick={showCroppedImage}
          />
          <IconButton
            variant='submit'
            aria-label='Crop Cancel Button'
            icon={<MdClose />}
            mx='.5rem'
            borderRadius='999px'
            bg='hsla(0, 100%, 60%, 1)'
            _hover={{ bg: 'hsla(0, 100%, 40%, 1)' }}
            _active={{ bg: 'hsla(0, 100%, 40%, 1)' }}
            onClick={onClose}
          />
        </Flex>
      </ModalContent>
    </Modal>
  )
}

import { Box } from '@chakra-ui/react'

import { useRecoilState } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import bg from 'images/profileCardBg.jpg'

const OuterWrapper = ({ children }) => {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)
  return (
    <Box
      background={`url(${bg})`}
      backgroundSize='cover'
      backgroundPosition='bottom center'
      borderRadius='20px'
      display='grid'
      placeItems='center'
      position='relative'
      overflow='hidden'
      onClick={() => isEditMode && setIsEditMode(false)}
    >
      {children}
    </Box>
  )
}

export default OuterWrapper

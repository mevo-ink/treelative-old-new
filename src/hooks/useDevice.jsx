import { useMediaQuery } from '@chakra-ui/react'

export default function useDevice () {
  const [isTouch] = useMediaQuery('(hover: none)')

  const [isDesktop] = useMediaQuery('(min-width: 1024px)')

  const responsive = ([mobileValue, desktopValue]) => isDesktop ? desktopValue : mobileValue

  return {
    isTouch,
    isDesktop,
    responsive
  }
}

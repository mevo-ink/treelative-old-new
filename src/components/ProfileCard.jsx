import {
  Box,
  Text,
  Image,
  Modal,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

import { useQuery } from 'urql'

import { useRecoilState, useRecoilValue } from 'recoil'

import { networkMethodsAtom, activeNodeIDAtom } from 'utils/atoms.js'

import { GET_USER } from 'graphql/queries/users'

import Slider from 'components/ProfileCard/Slider'
import Birth from 'components/ProfileCard/Slides/Birth'
import OuterWrapper from 'components/ProfileCard/OuterWrapper'
import InnerWrapper from 'components/ProfileCard/InnerWrapper'

import crown from 'images/adminCrown.png'

export default function ProfileCard () {
  const networkMethods = useRecoilValue(networkMethodsAtom)
  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query: GET_USER, variables: { filter: { id: activeNodeID } } })

  const onClose = () => {
    // clear the activeNodeID in store
    setActiveNodeID(null)
    // unselect all nodes
    networkMethods.unselectAll()
  }

  if (!activeNodeID) return null
  if (result.fetching) return <p>Loading</p>
  if (result.error) return <p>Error: {result.error.message}</p>
  if (result.data) {
    const user = result.data.getUser
    return (
      <Modal isOpen onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent background='transparent'>
          <OuterWrapper>
            <InnerWrapper>
              <Box
                w='30%'
                minH='auto'
                mt='-2.8rem'
                position='relative'
              >
                {user.role === 'ADMIN' && (
                  <Image
                    src={crown}
                    alt='crown'
                    w='100%'
                    objectFit='contain'
                    position='absolute'
                    top='-2.5rem'
                    zIndex='1'
                  />
                )}
                <Image
                  src={user.avatar}
                  fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                  alt='avatar'
                  objectFit='contain'
                  w='100%'
                  border={user.role === 'ADMIN' ? '5px solid #FFE503' : '5px solid #FFFFFF'}
                  borderRadius='50%'
                  filter='drop-shadow(0px 6px 8px hsla(0, 0%, 0%, .25))'
                />
              </Box>
              <Text
                w='50%'
                m='1rem 0rem'
                fontSize='1.2rem'
                lineHeight='1.3em'
                fontWeight='600'
                textAlign='center'
              >
                {user.fullName}
              </Text>
              <Slider>
                <Birth user={user} />
                <Birth user={user} />
              </Slider>
            </InnerWrapper>
          </OuterWrapper>
        </ModalContent>
      </Modal>
    )
  }
}

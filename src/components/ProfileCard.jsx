import {
  Box,
  Text,
  Image,
  Modal,
  IconButton,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

import { GrEdit } from 'react-icons/gr'

import { useQuery } from 'urql'

import { useRecoilState, useRecoilValue } from 'recoil'

import { networkMethodsAtom, activeNodeIDAtom, isEditModeAtom } from 'utils/atoms.js'

import { GET_USER } from 'graphql/queries/users'

import Slider from 'components/ProfileCard/Slider'
import Birth from 'components/ProfileCard/Slides/Birth'
import Current from 'components/ProfileCard/Slides/Current'
import OuterWrapper from 'components/ProfileCard/OuterWrapper'
import InnerWrapper from 'components/ProfileCard/InnerWrapper'

import crown from 'images/adminCrown.png'

export default function ProfileCard () {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)

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
              <IconButton
                icon={<GrEdit />}
                position='absolute'
                left='.3rem'
                top='.3rem'
                borderRadius='20px'
                background='none'
                _hover={{
                  background: 'hsla(0, 0%, 100%, .2)',
                  boxShadow: '0px 3px 5px hsla(0, 0%, 0%, .2)'
                }}
                _active={{
                  background: 'hsla(0, 0%, 100%, .2)',
                  boxShadow: '0px 3px 5px hsla(0, 0%, 0%, .2)'
                }}
                onClick={() => setIsEditMode(!isEditMode)}
              />
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
                <Current user={user} />
              </Slider>
            </InnerWrapper>
          </OuterWrapper>
        </ModalContent>
      </Modal>
    )
  }
}

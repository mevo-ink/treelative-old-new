import {
  Box,
  Image,
  Modal,
  IconButton,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

import { FiEdit } from 'react-icons/fi'
import { MdDone } from 'react-icons/md'

import { useQuery } from 'urql'

import { useRecoilState, useRecoilValue } from 'recoil'
import { networkMethodsAtom, activeNodeIDAtom, isEditModeAtom } from 'utils/atoms.js'

import { GET_USER } from 'graphql/queries/users'

import Login from 'components/Login'
import Loading from 'components/Loading'
import Slider from 'components/ProfileCard/Slider'
import Birth from 'components/ProfileCard/Slides/Birth'
import Death from 'components/ProfileCard/Slides/Death'
import Socials from 'components/ProfileCard/Slides/Socials'
import Current from 'components/ProfileCard/Slides/Current'
import OuterWrapper from 'components/ProfileCard/OuterWrapper'
import InnerWrapper from 'components/ProfileCard/InnerWrapper'
import ParentChild from 'components/ProfileCard/Slides/ParentChild'
import EditUserFullName from 'components/EditUser/EditUserFullName'

import crown from 'images/adminCrown.png'

export default function ProfileCard () {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)

  const networkMethods = useRecoilValue(networkMethodsAtom)
  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)

  const [result, refetch] = useQuery({ query: GET_USER, variables: { filter: { id: activeNodeID } } })

  const onClose = () => {
    // clear the activeNodeID in store
    setActiveNodeID(null)
    // unselect all nodes
    networkMethods.unselectAll()
    setIsEditMode(false)
  }

  const onLoginSuccess = () => {
    refetch({ requestPolicy: 'network-only' })
  }

  if (result.fetching) return <Loading />

  const user = result.data?.getUser

  return (
    <Modal isOpen onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent background='transparent' border='none'>
        <OuterWrapper>
          <InnerWrapper>
            {result.error && <Login onSuccess={onLoginSuccess} />}
            {result.data?.getUser && (
              <>
                <IconButton
                  icon={isEditMode ? <MdDone /> : <FiEdit />}
                  position='absolute'
                  left='.3rem'
                  top='.3rem'
                  borderRadius='20px'
                  color='hsla(261, 64%, 18%, 1)'
                  background='hsla(0, 0%, 100%, .2)'
                  boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
                  _hover={{
                    background: 'hsla(0, 0%, 50%, .2)'
                  }}
                  _active={{
                    background: 'hsla(0, 0%, 50%, .2)'
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
                    border={user.role === 'ADMIN' ? '5px solid hsla(54, 100%, 51%, 1)' : '5px solid hsla(0, 0%, 100%, 1)'}
                    borderRadius='50%'
                    boxShadow='0px 6px 8px hsla(0, 0%, 0%, .25)'
                  />
                </Box>
                <EditUserFullName user={user} />
                <Slider>
                  {user.dateOfDeath && <Death user={user} />}
                  <Birth user={user} />
                  <Current user={user} />
                  <Socials user={user} />
                  <ParentChild user={user} />
                </Slider>
              </>
            )}
          </InnerWrapper>
        </OuterWrapper>
      </ModalContent>
    </Modal>
  )
}

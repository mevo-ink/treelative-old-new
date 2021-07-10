import {
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
              {user.role === 'ADMIN' && (
                <Image
                  src={crown}
                  alt='crown'
                  width='30%'
                  objectFit='contain'
                  position='absolute'
                  top='0.4rem'
                  zIndex='1'
                />
              )}
              <Image
                src={user.avatar}
                fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                alt='avatar'
                w='30%'
                objectFit='contain'
                mt='-3.3rem'
                border={user.role === 'ADMIN' ? '5px solid #FFE503' : '5px solid #FFFFFF'}
                borderRadius='50%'
                filter='drop-shadow(0px 6px 8px hsla(0, 0%, 0%, .25))'
              />
              <Text
                w='55%'
                mt='0.5rem'
                fontSize='1.2rem'
                lineHeight='1.3em'
                fontWeight='600'
                textAlign='center'
              >
                {user.fullName}
              </Text>
              {/* <Slider user={user} /> */}
            </InnerWrapper>
          </OuterWrapper>
        </ModalContent>
      </Modal>
    )
  }
}

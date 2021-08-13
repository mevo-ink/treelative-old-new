import { useEffect } from 'react'

import {
  Modal,
  IconButton,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { useQuery } from 'urql'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import {
  layoutAtom,
  isEditModeAtom,
  activeNodeIDAtom,
  activeNodePulseIDAtom,
  networkMethodsAtom
} from 'utils/atoms.js'
import { GET_USER } from 'graphql/queries/users'

import Login from 'components/Login'
import Loading from 'components/Loading'
import Edit from 'components/ProfileCard/Edit'
import Avatar from 'components/EditUser/Avatar'
import Slider from 'components/ProfileCard/Slider'
import FullName from 'components/EditUser/FullName'
import Birth from 'components/ProfileCard/Slides/Birth'
import Death from 'components/ProfileCard/Slides/Death'
import FindMe from 'components/Menu/UserOptions/FindMe'
import Socials from 'components/ProfileCard/Slides/Socials'
import Current from 'components/ProfileCard/Slides/Current'
import Partner from 'components/ProfileCard/Slides/Partner'
import OuterWrapper from 'components/ProfileCard/OuterWrapper'
import InnerWrapper from 'components/ProfileCard/InnerWrapper'
import MoreSettings from 'components/ProfileCard/Slides/MoreSettings'
import ParentChild from 'components/ProfileCard/Slides/ParentChild'

import death from 'images/ProfileCard/death.png'
import birth from 'images/ProfileCard/birth.png'
import current from 'images/ProfileCard/current.png'
import partner from 'images/ProfileCard/partner.png'
import contact from 'images/ProfileCard/contact.png'
import relation from 'images/ProfileCard/relation.png'
import settings from 'images/ProfileCard/settings.png'

export default function ProfileCard () {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)
  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)

  const setActiveNodePulseID = useSetRecoilState(activeNodePulseIDAtom)

  const layout = useRecoilValue(layoutAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)

  useEffect(() => {
    // set the activeNodeID as url path
    if (activeNodeID) {
      window.history.pushState(null, null, activeNodeID)
    }
  }, [activeNodeID])

  const [result, refetch] = useQuery({ query: GET_USER, variables: { id: activeNodeID }, requestPolicy: 'network-only' })
  const user = result.data?.getUser

  const onClose = () => {
    // clear the activeNodeID
    window.history.pushState({}, '', '/')
    setActiveNodeID(null)
    setActiveNodePulseID(null)
    // unselect all nodes if on network layout
    layout === 'network' && networkMethods.unselectAll()
    setIsEditMode(false)
  }

  const onLoginSuccess = () => { refetch({ requestPolicy: 'network-only' }) }

  const innerBtnStyles = {
    position: 'absolute',
    top: '.3rem',
    borderRadius: '20px',
    color: 'hsla(261, 64%, 18%, 1)',
    background: 'hsla(0, 0%, 100%, .2)',
    boxShadow: '0px 3px 5px hsla(0, 0%, 0%, .2)',
    _hover: { background: 'hsla(0, 0%, 50%, .2)' },
    _active: { background: 'hsla(0, 0%, 50%, .2)' }
  }

  if (result.fetching) return <Loading />
  if (result.error) return <Login onSuccess={onLoginSuccess} onClose={onClose} />

  return (
    <Modal isOpen onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent background='transparent' border='none'>
        <IconButton
          size='2rem'
          icon={<MdClose size='1.5rem' />}
          position='absolute'
          zIndex='1'
          right='1rem'
          top='1rem'
          borderRadius='5px'
          bg='transparent'
          onClick={onClose}
        />
        <OuterWrapper>
          <InnerWrapper>
            {result.data?.getUser && (
              <>
                <Edit innerBtnStyles={innerBtnStyles} />
                <FindMe onClose={onClose} user={result.data?.getUser} {...innerBtnStyles} right='.3rem' />
                <Avatar user={user} />
                <FullName user={user} />
                <Slider>
                  <Death user={user} icon={death} isHidden={(!user.dateOfDeath && !isEditMode)} />
                  <Birth user={user} icon={birth} />
                  <Current user={user} icon={current} />
                  <Partner user={user} icon={partner} isHidden={(!user.partner && !isEditMode)} />
                  <ParentChild user={user} icon={relation} isHidden={(user.parents.length === 0 && user.children.length === 0 && !isEditMode)} />
                  <Socials user={user} icon={contact} />
                  <MoreSettings user={user} icon={settings} isHidden={!isEditMode} />
                </Slider>
              </>
            )}
          </InnerWrapper>
        </OuterWrapper>
      </ModalContent>
    </Modal>
  )
}

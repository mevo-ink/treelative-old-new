import {
  Modal,
  IconButton,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

import { FiEdit } from 'react-icons/fi'
import { MdDone, MdClose } from 'react-icons/md'

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
import Slider from 'components/ProfileCard/Slider'
import Birth from 'components/ProfileCard/Slides/Birth'
import Death from 'components/ProfileCard/Slides/Death'
import Socials from 'components/ProfileCard/Slides/Socials'
import Privacy from 'components/ProfileCard/Slides/Privacy'
import Current from 'components/ProfileCard/Slides/Current'
import Partner from 'components/ProfileCard/Slides/Partner'
import OuterWrapper from 'components/ProfileCard/OuterWrapper'
import InnerWrapper from 'components/ProfileCard/InnerWrapper'
import EditUserAvatar from 'components/EditUser/EditUserAvatar'
import Notification from 'components/ProfileCard/Slides/Notification'
import ParentChild from 'components/ProfileCard/Slides/ParentChild'
import EditUserFullName from 'components/EditUser/EditUserFullName'

import FindMe from 'components/Menu/FindMe'

export default function ProfileCard () {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)
  const [activeNodeID, setActiveNodeID] = useRecoilState(activeNodeIDAtom)

  const setActiveNodePulseID = useSetRecoilState(activeNodePulseIDAtom)

  const layout = useRecoilValue(layoutAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)

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
            {result.error && <Login onSuccess={onLoginSuccess} />}
            {result.data?.getUser && (
              <>
                <IconButton icon={isEditMode ? <MdDone /> : <FiEdit />} {...innerBtnStyles} left='.3rem' onClick={() => setIsEditMode(!isEditMode)} />
                <FindMe onClose={onClose} user={result.data?.getUser} {...innerBtnStyles} right='.3rem' />
                <EditUserAvatar user={user} />
                <EditUserFullName user={user} />
                <Slider>
                  <Death user={user} isHidden={(!user.dateOfDeath && !isEditMode)} />
                  <Birth user={user} />
                  <Current user={user} />
                  <Partner user={user} isHidden={(!user.couple && !isEditMode)} />
                  <ParentChild user={user} isHidden={(user.parents.length === 0 && user.children.length === 0 && !isEditMode)} />
                  <Socials user={user} />
                  <Privacy user={user} isHidden={!isEditMode} />
                  <Notification user={user} isHidden={!isEditMode} />
                </Slider>
              </>
            )}
          </InnerWrapper>
        </OuterWrapper>
      </ModalContent>
    </Modal>
  )
}

import {
  Modal,
  IconButton,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'

import { useQuery } from 'urql'
import { useRecoilState } from 'recoil'

import {
  isEditModeAtom
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
import Socials from 'components/ProfileCard/Slides/Socials'
import Current from 'components/ProfileCard/Slides/Current'
import Partner from 'components/ProfileCard/Slides/Partner'
import OuterWrapper from 'components/ProfileCard/OuterWrapper'
import InnerWrapper from 'components/ProfileCard/InnerWrapper'
import MoreSettings from 'components/ProfileCard/Slides/MoreSettings'
import ParentChild from 'components/ProfileCard/Slides/ParentChild'

import { useRouter } from 'next/router'

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

const ProfileCard = ({ userID }) => {
  const router = useRouter()

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)

  const [result, refetch] = useQuery({ query: GET_USER, variables: { id: userID } })
  const user = result.data?.getUser

  const onClose = () => {
    setIsEditMode(false)
    router.push('/')
  }

  const onLoginSuccess = () => { refetch({ requestPolicy: 'network-only' }) }

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
            {user && (
              <>
                <Edit innerBtnStyles={innerBtnStyles} />
                <Avatar user={user} />
                <FullName user={user} />
                <Slider>
                  <Death user={user} icon='/images/ProfileCard/death.png' isHidden={(!user.dateOfDeath && !isEditMode)} />
                  <Birth user={user} icon='/images/ProfileCard/birth.png' />
                  <Current user={user} icon='/images/ProfileCard/current.png' />
                  <Partner user={user} icon='/images/ProfileCard/partner.png' isHidden={(!user.partner && !isEditMode)} />
                  <ParentChild user={user} icon='/images/ProfileCard/relation.png' isHidden={(user.parents.length === 0 && user.children.length === 0 && !isEditMode)} />
                  <Socials user={user} icon='/images/ProfileCard/contact.png' />
                  <MoreSettings user={user} icon='/images/ProfileCard/settings.png' isHidden={!isEditMode} />
                </Slider>
              </>
            )}
          </InnerWrapper>
        </OuterWrapper>
      </ModalContent>
    </Modal>
  )
}

export default ProfileCard

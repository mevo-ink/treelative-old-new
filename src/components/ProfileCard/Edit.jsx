import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

import { IconButton } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { MdDone } from 'react-icons/md'

import { useQuery } from 'react-query'
import { whoAmI } from 'graphql/client/queries/auth'

import { useRecoilState } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import Delete from 'components/ProfileCard/Delete'

export default function Edit ({ innerBtnStyles, user }) {
  const router = useRouter()

  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)
  const activeNodeID = router.query.userID

  const { data: authUser } = useQuery('whoAmI', whoAmI)

  const checkEditable = () => {
    if (authUser?.isAdmin) return true
    if (authUser?.id === activeNodeID) return true
    if (authUser?.children?.find(child => child.id === activeNodeID)) return true
    if (authUser?.parents?.find(parent => parent.id === activeNodeID)) return true
    if (activeNodeID === authUser?.partner?.id) return true
  }

  const handleEdit = () => {
    if (!checkEditable()) {
      setCookie(null, 'REDIRECT_REFERRER', `/users/${activeNodeID}`, { path: '/' })
      router.push('?login=auth', '/auth/login', { shallow: true, scroll: false })
    } else {
      setIsEditMode(!isEditMode)
    }
  }

  return (
    <>
      <IconButton
        icon={isEditMode ? <MdDone /> : <FiEdit />}
        {...innerBtnStyles}
        left='.3rem'
        bgColor={isEditMode && 'hsla(130, 65%, 55%, .5)'}
        _active={{ bgColor: isEditMode && 'hsla(130, 65%, 45%, .5)' }}
        _hover={{ bgColor: isEditMode && 'hsla(130, 65%, 45%, .5)' }}
        onClick={handleEdit}
      />
      {checkEditable() && (
        <Delete innerBtnStyles={innerBtnStyles} user={user} />
      )}
    </>
  )
}

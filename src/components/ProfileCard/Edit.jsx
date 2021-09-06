import { IconButton } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { MdDone } from 'react-icons/md'

import { useQuery } from 'urql'
import { useRecoilState, useRecoilValue } from 'recoil'

import { WHO_AM_I } from 'graphql/client/queries/auth'
import { isEditModeAtom, activeNodeIDAtom } from 'utils/atoms.js'

import Delete from 'components/ProfileCard/Delete'

export default function Edit ({ innerBtnStyles, user }) {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)
  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  const [whoAmIResult] = useQuery({ query: WHO_AM_I })
  const authUser = whoAmIResult.data?.whoAmI

  const checkEditable = () => {
    if (authUser?.children.find(child => child.id === activeNodeID)) return true
    if (authUser?.parents.find(parent => parent.id === activeNodeID)) return true
    if (activeNodeID === authUser?.partner?.id) return true
  }

  return (
    <>
      {(authUser?.isAdmin || authUser?.id === activeNodeID || checkEditable()) && (
        <>
          <IconButton
            icon={isEditMode ? <MdDone /> : <FiEdit />}
            {...innerBtnStyles}
            left='.3rem'
            bgColor={isEditMode && 'hsla(130, 65%, 55%, .5)'}
            _active={{ bgColor: isEditMode && 'hsla(130, 65%, 45%, .5)' }}
            _hover={{ bgColor: isEditMode && 'hsla(130, 65%, 45%, .5)' }}
            onClick={() => setIsEditMode(!isEditMode)}
          />
          <Delete innerBtnStyles={innerBtnStyles} user={user} />
        </>
      )}
    </>
  )
}

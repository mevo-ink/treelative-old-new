import { IconButton } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { MdDone } from 'react-icons/md'

import { useQuery } from 'urql'
import { useRecoilState, useRecoilValue } from 'recoil'

import { WHO_AM_I } from 'graphql/queries/auth'
import { isEditModeAtom, activeNodeIDAtom } from 'utils/atoms.js'

export default function Edit ({ innerBtnStyles }) {
  const [isEditMode, setIsEditMode] = useRecoilState(isEditModeAtom)
  const activeNodeID = useRecoilValue(activeNodeIDAtom)

  const [whoAmIResult] = useQuery({ query: WHO_AM_I })
  const authUser = whoAmIResult.data?.whoAmI

  return (
    <>
      {(authUser?.isAdmin || authUser?.id === activeNodeID) && (
        <IconButton
          icon={isEditMode ? <MdDone /> : <FiEdit />}
          {...innerBtnStyles}
          left='.3rem'
          onClick={() => setIsEditMode(!isEditMode)}
        />
      )}
    </>
  )
}

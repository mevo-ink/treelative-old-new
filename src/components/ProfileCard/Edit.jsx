import { IconButton } from '@chakra-ui/react'
import { FiEdit } from 'react-icons/fi'
import { IoMdDoneAll } from 'react-icons/io'

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
          icon={isEditMode ? <IoMdDoneAll /> : <FiEdit />}
          {...innerBtnStyles}
          left='.3rem'
          bgColor={isEditMode && 'hsla(130, 65%, 55%, .5)'}
          _active={{ bgColor: isEditMode && 'hsla(130, 65%, 45%, .5)' }}
          _hover={{ bgColor: isEditMode && 'hsla(130, 65%, 45%, .5)' }}
          onClick={() => setIsEditMode(!isEditMode)}
        />
      )}
    </>
  )
}

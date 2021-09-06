import { useState } from 'react'

import { IconButton } from '@chakra-ui/react'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { useRecoilValue } from 'recoil'
import { useQuery, useMutation } from 'urql'

import { WHO_AM_I } from 'graphql/client/queries/auth'
import { isEditModeAtom } from 'utils/atoms.js'
import { DELETE_USER } from 'graphql/client/mutations/users'

import ConfirmationModal from 'components/_common/ConfirmationModal'

export default function Edit ({ innerBtnStyles, user }) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const [isConfirm, setIsConfirm] = useState(false)

  const [deleteUserResult, deleteUser] = useMutation(DELETE_USER)

  const [whoAmIResult] = useQuery({ query: WHO_AM_I })
  const authUser = whoAmIResult.data?.whoAmI

  const handleDeleteUser = () => {
    const variables = { userID: user.id }
    return deleteUser(variables)
  }

  const handleClear = (e) => {
    e.stopPropagation()
    setIsConfirm(true)
  }

  const confirmClear = () => {
    handleDeleteUser()
      .then(() => setIsConfirm(false))
  }

  const cancelClear = () => setIsConfirm(false)

  return (
    <>
      {isConfirm && (
        <ConfirmationModal
          title={`Delete ${user.shortName}`}
          onConfirm={confirmClear}
          onCancel={cancelClear}
          isLoading={deleteUserResult.fetching}
        />
      )}
      {isEditMode && authUser.isAdmin && (
        <IconButton
          icon={<RiDeleteBin6Line />}
          {...innerBtnStyles}
          left='.3rem'
          top='3.3rem'
          bgColor={isEditMode && 'hsla(0, 65%, 55%, .5)'}
          _active={{ bgColor: isEditMode && 'hsla(0, 65%, 45%, .5)' }}
          _hover={{ bgColor: isEditMode && 'hsla(0, 65%, 45%, .5)' }}
          onClick={handleClear}
        />
      )}
    </>
  )
}

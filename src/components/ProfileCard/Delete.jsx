import { useState } from 'react'

import { IconButton } from '@chakra-ui/react'
import { RiDeleteBin6Line } from 'react-icons/ri'

import { useQuery, useMutation } from 'react-query'
import { whoAmI } from 'graphql/client/queries/auth'
import { deleteUser } from 'graphql/client/mutations/users'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom, layoutMethodsAtom } from 'utils/atoms.js'

import ConfirmationModal from 'components/_common/ConfirmationModal'

export default function Edit ({ innerBtnStyles, user }) {
  const isEditMode = useRecoilValue(isEditModeAtom)
  const layoutMethods = useRecoilValue(layoutMethodsAtom)

  const [isConfirm, setIsConfirm] = useState(false)

  const { mutateAsync, isLoading } = useMutation(deleteUser)

  const { data: authUser } = useQuery('whoAmI', whoAmI)

  const handleDeleteUser = () => {
    return mutateAsync({ userID: user.id }, { onSuccess: () => { layoutMethods.refetch() } })
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
          isLoading={isLoading}
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

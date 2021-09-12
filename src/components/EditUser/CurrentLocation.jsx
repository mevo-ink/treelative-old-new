import { useRouter } from 'next/router'

import { useMutation, useQueryClient } from 'react-query'
import { updateUserGeneral } from 'graphql/client/mutations/users'

import { useRecoilValue } from 'recoil'
import { layoutMethodsAtom } from 'utils/atoms.js'

import LocationTrigger from 'components/_trigger/LocationTrigger'

export default function CurrentLocation ({ user, ...props }) {
  const { mutateAsync, error, isLoading } = useMutation(updateUserGeneral)

  const layoutMethods = useRecoilValue(layoutMethodsAtom)
  const router = useRouter()
  const layout = router.pathname.split('/')[2]

  const queryClient = useQueryClient()
  const onSuccess = (updatedData) => {
    layout === 'map' && layoutMethods.refetch()
    const existingData = queryClient.getQueryData(['getUser', { id: user.id }]) || {}
    queryClient.setQueryData(['getUser', { id: user.id }], { ...existingData, ...updatedData })
  }

  const handleEditCurrentLocation = currentLocation => {
    return mutateAsync({ userID: user.id, input: { currentLocation } }, { onSuccess })
  }

  return (
    <LocationTrigger
      title='Edit Current Location'
      value={user?.currentLocation}
      onSubmit={handleEditCurrentLocation}
      isLoading={isLoading}
      error={error}
      {...props}
    />
  )
}

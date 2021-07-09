import { useQuery } from 'urql'
import { GET_USER_SOCIAL } from 'graphql/queries/users'

import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import Loading from 'components/_common/Loading'
import ErrorAlert from 'components/_common/ErrorAlert'

import {
  Alert,
  Stack,
  AlertIcon,
  AlertDescription
} from '@chakra-ui/react'

import CreateSocialLink from 'components/EditUser/social/CreateSocialLink'

import EditSocialLinkUrl from 'components/EditUser/social/EditSocialLinkUrl'
import EditSocialLinkType from 'components/EditUser/social/EditSocialLinkType'
import DeleteSocialLink from 'components/EditUser/social/DeleteSocialLink'

export default function ViewUserSocialLinks ({ user }) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const [result, refetch] = useQuery({ query: GET_USER_SOCIAL, variables: { filter: { id: user.id } } })

  if (result.fetching) return <Loading />

  if (result.error) return <ErrorAlert> {result.error.message} </ErrorAlert>

  return (
    <Stack spacing='4'>
      {isEditMode && (
        <Stack alignItems='center'>
          <CreateSocialLink user={user} />
        </Stack>
      )}
      {result.data.getUser.socialLinks.length === 0 && (
        <Alert status='warning' borderRadius='lg'>
          <AlertIcon />
          <AlertDescription>
            No social links available
          </AlertDescription>
        </Alert>
      )}
      {result.data.getUser.socialLinks.map(socialLink => (
        <Stack
          key={socialLink.id}
          spacing='4'
          justifyContent='space-between'
          alignItems='center'
        >
          <Stack direction='row'>
            {isEditMode && <DeleteSocialLink socialLink={socialLink} refetch={() => refetch({ requestPolicy: 'network-only' })} />}
            <EditSocialLinkType socialLink={socialLink} isDisabled={!isEditMode} />
          </Stack>
          <EditSocialLinkUrl socialLink={socialLink} fontSize='xs' isDisabled={!isEditMode} />
        </Stack>
      ))}
    </Stack>
  )
}

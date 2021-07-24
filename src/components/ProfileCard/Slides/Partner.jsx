import {
  Flex,
  Text
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import EditUserPartner from 'components/EditUser/EditUserPartner'
import EditUserDateOfMarriage from 'components/EditUser/EditUserDateOfMarriage'
import EditUserMarriageLocation from 'components/EditUser/EditUserMarriageLocation'

export default function ParentChild ({ user }) {
  const isEditMode = useRecoilValue(isEditModeAtom)
  return (
    <Flex
      w='80%'
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      background='hsla(0, 0%, 100%, .2)'
      boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
      borderRadius='20px'
      p='1.5rem 0'
    >
      <Text variant='info-title'> Partner </Text>
      <EditUserPartner user={user} />
      {(user.couple.dateOfMarriage || isEditMode) && (
        <>
          <Text variant='info-title' mt='1rem'> Date Of Marriage </Text>
          <EditUserDateOfMarriage user={user} />
        </>
      )}
      {(user.couple.marriageLocation || isEditMode) && (
        <>
          <Text variant='info-title' mt='1rem'> Marriage Location </Text>
          <EditUserMarriageLocation user={user} />
        </>
      )}
    </Flex>
  )
}

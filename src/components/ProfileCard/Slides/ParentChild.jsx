import {
  Flex,
  Text
} from '@chakra-ui/react'

import { useRecoilValue } from 'recoil'

import { isEditModeAtom } from 'utils/atoms.js'

import EditUserParents from 'components/EditUser/EditUserParents'
import EditUserChildren from 'components/EditUser/EditUserChildren'

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
      {(user.parents.length !== 0 || isEditMode) && (
        <>
          <Text variant='info-title'>
            Parents
          </Text>
          <EditUserParents user={user} />
        </>
      )}
      {(user.children.length !== 0 || isEditMode) && (
        <>
          <Text variant='info-title' mt='1rem'>
            Children
          </Text>
          <EditUserChildren user={user} />
        </>
      )}
    </Flex>
  )
}

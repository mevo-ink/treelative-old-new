import {
  Flex,
  Text
} from '@chakra-ui/react'

import EditUserDateOfBirth from 'components/EditUser/EditUserDateOfBirth'
import EditUserBirthLocation from 'components/EditUser/EditUserBirthLocation'

import LocationRenderer from 'components/_common/LocationRenderer'

export default function Birth ({ user }) {
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
      <Text variant='info-title'>
        Date Of Birth
      </Text>
      <EditUserDateOfBirth user={user} />
      <Text variant='info-title' mt='1rem'>
        Birth Location
      </Text>
      <EditUserBirthLocation user={user} />
      <LocationRenderer placeID={user.birthLocation?.suggested.place_id} />
    </Flex>
  )
}

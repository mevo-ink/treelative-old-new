import { useQuery } from 'urql'

import { useSetRecoilState } from 'recoil'
import { activeNodeIDAtom } from 'utils/atoms.js'

import Loading from 'components/_common/Loading'

import {
  Box,
  Text,
  Stack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody
} from '@chakra-ui/react'

export default function UsersMoreInfo ({ query, variables, onClose, title }) {
  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const [result] = useQuery({ query, variables })

  return (
    <Modal isOpen isCentered onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{result.data?.users?.length} {title}</ModalHeader>
        <ModalBody maxH='300px' overflowY='auto'>
          {result.fetching && <Loading />}
          {result.data && (
            <Stack>
              {result.data.users.map(user => (
                <HStack key={user.id}>
                  <Box
                    w='40px'
                    h='40px'
                    mx='.5rem'
                    my='3'
                    objectFit='contain'
                    borderRadius='50%'
                    zIndex='4'
                    backgroundImage={user.avatar}
                    backgroundSize='100% auto'
                    backgroundPosition='center'
                    onClick={() => setActiveNodeID(user.id)}
                  />
                  <Text>{user.fullName}</Text>
                </HStack>
              ))}
            </Stack>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

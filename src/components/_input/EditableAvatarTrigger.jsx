import {
  Box,
  Text,
  Flex,
  Image,
  Button,
  keyframes,
  IconButton,
  useDisclosure,
  createStandaloneToast
} from '@chakra-ui/react'
import { MdAdd } from 'react-icons/md'

import { useRecoilValue, useSetRecoilState } from 'recoil'

import { isEditModeAtom, activeNodeIDAtom, layoutAtom, networkMethodsAtom } from 'utils/atoms.js'

import RemoveButton from 'components/_input/RemoveButton'
import EditableAvatarModal from 'components/_input/EditableAvatarModal'

const toast = createStandaloneToast()

export default function EditableAvatarTrigger (props) {
  const {
    user,
    title,
    relations,
    removeRelation,
    removeRelationResult,
    ...inputProps
  } = props

  const layout = useRecoilValue(layoutAtom)
  const isEditMode = useRecoilValue(isEditModeAtom)
  const networkMethods = useRecoilValue(networkMethodsAtom)

  const setActiveNodeID = useSetRecoilState(activeNodeIDAtom)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const handleAvatarClick = (userID) => {
    setActiveNodeID(userID)
    window.history.pushState({}, '', userID)
  }

  const handleRemoveRelation = (id, shortName) => {
    const variables = { userID: user.id, [title.toLowerCase().substring(4) + 'ID']: id }
    removeRelation(variables)
      .then(result => {
        if (result.data) {
          toast({
            title: `Successfully removed ${shortName}`,
            status: 'success',
            position: 'top',
            duration: 3000,
            isClosable: true
          })
          layout === 'network' && networkMethods.refetch()
        }
      })
  }
  return (
    <>
      {isOpen && <EditableAvatarModal user={user} onClose={onClose} relations={relations} title={title} {...inputProps} />}
      <Flex w='85%' flexWrap='wrap' justifyContent='center'>
        {relations.map(user => (
          <Box key={user.id} animation={isEditMode && `${wiggle} infinite .15s linear`}>
            <Box
              w='2.5rem'
              h='2.5rem'
              p='0'
              m='0 .2rem'
              cursor='pointer'
              mt='1rem'
              position='relative'
            >
              {isEditMode && (
                <RemoveButton
                  title='Remove Relation'
                  onRemove={() => handleRemoveRelation(user.id, user.shortName)}
                  isLoading={removeRelationResult.fetching}
                />
              )}
              <Button
                w='100%'
                h='100%'
                p='0'
                borderRadius='50%'
              >
                <Image
                  src={user.avatar}
                  alt='user-avatar'
                  w='100%'
                  h='100%'
                  borderRadius='50%'
                  fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                  onClick={() => handleAvatarClick(user.id)}
                />
              </Button>
            </Box>
            <Text variant='info-title' fontSize='.65rem' mt='.2rem' textAlign='center'>{user.shortName}</Text>
          </Box>
        ))}
        {isEditMode && (title === 'Add Parent' ? relations.length < 2 : title === 'Add Partner' ? relations.length < 1 : relations.length < 8) && (
          <IconButton
            icon={<MdAdd size='2rem' />}
            w='2rem'
            objectFit='contain'
            p='0'
            m='0 .2rem'
            mt='1rem'
            cursor='pointer'
            borderRadius='50%'
            color='hsla(261, 64%, 18%, 1)'
            background='hsla(0, 0%, 100%, .2)'
            boxShadow='0px 3px 5px hsla(0, 0%, 0%, .2)'
            onClick={onOpen}
          />
        )}
      </Flex>
    </>
  )
}

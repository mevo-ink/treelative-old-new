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

import RemoveButton from 'components/_common/RemoveButton'
import RelationModal from 'components/_modal/RelationModal'

const toast = createStandaloneToast()

export default function AvatarTrigger (props) {
  const {
    user,
    title,
    relations = [],
    removeRelation,
    removeRelationResult,
    limit = 8,
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

  const handleRemoveRelation = (id) => {
    return removeRelation(id)
      .then(result => {
        if (result.data) {
          toast({
            title: 'Successfully Removed Relation',
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
      {isOpen && <RelationModal user={user} onClose={onClose} relations={relations} title={title} {...inputProps} />}
      <Flex w='85%' flexWrap='wrap' justifyContent='center'>
        {relations.map(user => user && (
          <Box key={user.id} animation={isEditMode && `${wiggle} infinite .15s linear`}>
            <Box
              w='3.2rem'
              h='3.2rem'
              mx='.2rem'
              mt='1rem'
              cursor='pointer'
              position='relative'
            >
              {isEditMode && (
                <RemoveButton
                  title={'Remove' + title.substring(3)}
                  onRemove={() => handleRemoveRelation(user.id)}
                  isLoading={removeRelationResult.fetching}
                />
              )}
              <Button
                w='100%'
                h='100%'
                p='0'
                borderRadius='50%'
                isDisabled={isEditMode}
                _disabled={{ opacity: '1' }}
                onClick={() => handleAvatarClick(user.id)}
              >
                <Image
                  src={user.avatar}
                  fallbackSrc={`https://ui-avatars.com/api/?name=${user.fullName}&background=random&rounded=true&font-size=0.5&bold=true`}
                  alt='user-avatar'
                  w='100%'
                  h='100%'
                  p='.3rem'
                  borderRadius='50%'
                />
              </Button>
            </Box>
            <Text variant='info-title' fontSize='.65rem' mt='.2rem' textAlign='center'>{user.shortName}</Text>
          </Box>
        ))}
        {isEditMode && (relations.length < limit) && (
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

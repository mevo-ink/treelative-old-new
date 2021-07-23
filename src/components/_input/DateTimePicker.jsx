import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import {
  format,
  getYear,
  getMonth,
  eachYearOfInterval
} from 'date-fns'

import {
  Text,
  Modal,
  Stack,
  Alert,
  Button,
  keyframes,
  ModalBody,
  AlertIcon,
  IconButton,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  ModalCloseButton,
  createStandaloneToast
} from '@chakra-ui/react'

import { MdNavigateNext } from 'react-icons/md'

import ReactDatePicker from 'react-datepicker'
import DateTimeRenderer from 'components/_common/DateTimeRenderer'
import CustomSelect from 'components/_select/CustomSelect'

import RemoveButton from 'components/_input/RemoveButton'

import Loading from 'components/_common/Loading'

import 'react-datepicker/dist/react-datepicker.css'

const toast = createStandaloneToast()

export default function DateTimePickerDialogTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const wiggle = keyframes`
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-1deg); }
    100% { transform: rotate(1deg); }
  `

  const dt = new Date(props.value)
  const dtDateOnly = new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000)

  const {
    inline = false,
    reset,
    onChange,
    fontSize,
    notification = '',
    defaultIsOpen = false,
    ...rest
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen })

  const handleClose = () => {
    reset && reset()
    onClose()
    defaultIsOpen && rest.onClose()
  }

  const handleOnSubmit = async (newValue) => {
    try {
      onChange(newValue)
        .then(result => {
          if (result.data) {
            if (notification) {
              toast({
                title: notification,
                status: 'success',
                position: 'top',
                duration: 3000,
                isClosable: true
              })
            }
            onClose()
            defaultIsOpen && rest.onClose(true)
          }
        })
        .catch(console.log)
    } catch (e) {
      if (!(onChange instanceof Promise)) {
        onClose()
      }
      console.log(e.message)
    }
  }

  if (!inline && !isEditMode && !defaultIsOpen) {
    return (
      <Text variant='info'>
        {props.value ? format(dtDateOnly, 'PP').replace(/[, ]+/g, '/') : 'Unavailable'}
      </Text>
    )
  }

  return (
    <>
      {isOpen && <DateTimePickerDialog {...rest} onClose={handleClose} onSubmit={handleOnSubmit} />}
      <Button
        onClick={onOpen}
        variant='editable-input'
        animation={`${wiggle} infinite .15s linear`}
      >
        {isEditMode && <RemoveButton inputProps={{ onSubmit: handleOnSubmit, name: rest.name, value: rest.value }} />}
        {props.value ? format(dtDateOnly, 'PP').replace(/[, ]+/g, '/') : 'Unavailable'}
      </Button>
    </>
  )
}

function DateTimePickerDialog (props) {
  const {
    title,
    onClose,
    loading,
    value,
    onSubmit,
    error,
    children,
    label,
    fontSize = 'xl',
    type = 'date',
    isClearable,
    alert = '',
    ...rest
  } = props

  const dt = new Date(value || new Date().toISOString())
  const dtDateOnly = value ? new Date(dt.valueOf() + dt.getTimezoneOffset() * 60 * 1000) : dt

  return (
    <Modal isOpen isCentered onClose={onClose} scrollBehavior='inside' size={type === 'date' ? 'sm' : 'lg'}>
      <ModalOverlay />
      <ModalContent pb={!children ? '2' : '6'}>
        <ModalHeader>
          {title || label}
        </ModalHeader>
        <ModalCloseButton isDisabled={loading} />
        <ModalBody textAlign='center'>
          <Stack
            spacing='2'
            sx={{
              '.react-datepicker': {
                background: 'hsl(231, 33%, 8%)',
                border: '1px solid white',
                padding: '20px 10px'
              },
              '.react-datepicker__header': {
                background: 'transparent'
              },
              '.react-datepicker__day': {
                color: 'white',
                '&:hover': {
                  background: 'hsla(0, 0%, 100%, 0.25)'
                }
              },
              '.react-datepicker__day-name': {
                color: 'white'
              }
            }}
          >
            {alert && <Alert status='warning' borderRadius='lg'> <AlertIcon /> {alert} </Alert>}
            <ReactDatePicker
              inline
              selected={type === 'time' ? dt : dtDateOnly}
              onChange={onSubmit}
              showTimeSelect={type === 'time'}
              showYearDropdown
              showMonthDropdown
              dropdownMode='select'
              renderCustomHeader={CustomHeader}
              {...rest}
            />
            {loading && <Loading />}
            {value && <DateTimeRenderer value={value} type={type} fontSize={fontSize} fontWeight='bold' />}
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Stack spacing='4' width='100%' alignItems='center'>
            {error && <Alert status='error'> <AlertIcon /> {error.message} </Alert>}
            {children}
            {isClearable && value && (
              <Button
                colorScheme='orange'
                variant='outline'
                onClick={() => onSubmit(null)}
              >
                Remove Date
              </Button>
            )}
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const yearOptions = eachYearOfInterval({
  start: new Date(1900, 1, 1),
  end: new Date()
}).map(date => ({ value: getYear(date), label: getYear(date) }))

const monthOptions = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
].map((month, idx) => ({ value: idx, label: month }))

function CustomHeader (props) {
  const {
    date,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
  } = props

  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center' px='2'>
      <Stack width='100%'>
        <CustomSelect
          value={{ value: getYear(date), label: getYear(date) }}
          options={yearOptions}
          onChange={({ value }) => changeYear(value)}
        />
        <CustomSelect
          value={monthOptions[getMonth(date)]}
          options={monthOptions}
          onChange={({ value }) => changeMonth(value)}
        />
      </Stack>
      <IconButton
        size='sm'
        variant='outline'
        aria-label='Previous Month'
        icon={<MdNavigateNext />}
        transform='rotate(180deg)'
        onClick={decreaseMonth}
        isDisabled={prevMonthButtonDisabled}
      />
      <IconButton
        size='sm'
        variant='outline'
        aria-label='Next Month'
        icon={<MdNavigateNext />}
        onClick={increaseMonth}
        isDisabled={nextMonthButtonDisabled}
      />
    </Stack>
  )
}

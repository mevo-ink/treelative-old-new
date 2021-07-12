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

import { GrFormPrevious, GrFormNext } from 'react-icons/gr'

import ReactDatePicker from 'react-datepicker'
import DateTimeRenderer from 'components/_common/DateTimeRenderer'
import CustomSelect from 'components/_select/CustomSelect'

import Loading from 'components/_common/Loading'

import './datetimePicker.css'
import 'react-datepicker/dist/react-datepicker.css'

const toast = createStandaloneToast()

export default function DateTimePickerDialogTrigger (props) {
  const isEditMode = useRecoilValue(isEditModeAtom)

  const shake = keyframes`
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
    ...rest
  } = props

  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    reset && reset()
    onClose()
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

  if (!inline && !isEditMode) {
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
        animation={`${shake} infinite .15s linear`}
      >
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
          <Stack spacing='2'>
            <DateTimeRenderer value={value} type={type} fontSize={fontSize} fontWeight='bold' />
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
        icon={<GrFormPrevious />}
        onClick={decreaseMonth}
        isDisabled={prevMonthButtonDisabled}
      />
      <IconButton
        size='sm'
        variant='outline'
        aria-label='Next Month'
        icon={<GrFormNext />}
        onClick={increaseMonth}
        isDisabled={nextMonthButtonDisabled}
      />
    </Stack>
  )
}

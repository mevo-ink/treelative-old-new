import { useRecoilValue } from 'recoil'
import { isEditModeAtom } from 'utils/atoms.js'

import {
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

import { BiEdit } from 'react-icons/bi'
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
    return <DateTimeRenderer value={props.value} type={props.type} />
  }

  return (
    <>
      {isOpen && <DateTimePickerDialog {...rest} onClose={handleClose} onSubmit={handleOnSubmit} />}
      <Button size='sm' onClick={onOpen} rightIcon={<BiEdit />} variant='outline' whiteSpace='normal' height='100%' wordBreak='break-all'>
        <DateTimeRenderer value={props.value} type={props.type} />
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
    subTitle = '',
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
          <Text fontSize='xs'>{subTitle}</Text>
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

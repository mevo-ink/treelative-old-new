export default function useStyles (isDarkTheme = false) {
  const inputBgColor = !isDarkTheme ? 'white' : 'blue.800'
  const inputColor = !isDarkTheme ? 'black' : 'white'

  const controlBgColor = !isDarkTheme ? 'white' : 'var(--chakra-colors-blue-900)'
  const controlColor = !isDarkTheme ? 'black' : 'white'

  const menuBgColor = !isDarkTheme ? 'white' : 'var(--chakra-colors-blue-900)'
  const menuColor = 'black'

  const optionFocusedBgColor = !isDarkTheme ? 'var(--chakra-colors-blue-100)' : 'var(--chakra-colors-blue-600)'
  const optionFocusedColor = !isDarkTheme ? 'black' : 'white'
  const optionNormalBgColor = !isDarkTheme ? 'white' : 'var(--chakra-colors-blue-800)'
  const optionNormalColor = !isDarkTheme ? 'black' : 'white'

  const multiValueBgColor = 'var(--chakra-colors-blue-500)'
  const multiValueColor = 'white'

  const singleValueColor = !isDarkTheme ? 'black' : 'white'

  const dropdownIndicatorColor = 'var(--chakra-colors-blue-500)'

  return {
    dropdownIndicator: (styles, { isFocused }) => ({
      ...styles,
      color: dropdownIndicatorColor
    }),
    input: (styles) => ({
      ...styles,
      backgroundColor: inputBgColor,
      color: inputColor
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: controlBgColor,
      color: controlColor,
      borderColor: 'var(--chakra-colors-blue-800)',
      ':hover': {
        borderColor: 'var(--chakra-colors-blue-500)'
      }
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: menuBgColor,
      color: menuColor
    }),
    option: (styles, { isFocused, data }) => ({
      ...styles,
      backgroundColor: isFocused ? optionFocusedBgColor : optionNormalBgColor,
      color: isFocused ? optionFocusedColor : optionNormalColor,
      borderRadius: '3px'

    }),
    multiValue: (styles) => ({
      ...styles,
      backgroundColor: multiValueBgColor,
      color: multiValueColor,
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '18px',
      borderRadius: '10px',
      padding: '0px 4px'
    }),
    multiValueRemove: (styles) => ({
      ...styles,
      height: '30px',
      width: '25px',
      display: 'flex',
      justifyContent: 'center',
      borderRadius: '6px',
      ':hover': {
        backgroundColor: 'var(--chakra-colors-red-500)',
        color: 'white'
      }
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      color: multiValueColor
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      color: singleValueColor
    })
  }
}

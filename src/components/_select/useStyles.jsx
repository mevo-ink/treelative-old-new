export default function useStyles () {
  const inputBgColor = 'transparent'
  const inputColor = 'white'

  const controlBgColor = 'transparent'
  const controlColor = 'white'

  const menuBgColor = 'hsla(0, 0%, 0%, 0.8)'
  const menuColor = 'black'

  const optionFocusedBgColor = 'var(--chakra-colors-blue-600)'
  const optionFocusedColor = 'white'
  const optionNormalBgColor = 'transparent'
  const optionNormalColor = 'white'

  const multiValueBgColor = 'var(--chakra-colors-blue-600)'
  const multiValueColor = 'white'

  const singleValueColor = 'white'

  const dropdownIndicatorColor = 'var(--chakra-colors-blue-600)'

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
        borderColor: 'var(--chakra-colors-blue-600)'
      }
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: menuBgColor,
      color: menuColor,
      borderRadius: '10px'
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
        backgroundColor: 'var(--chakra-colors-red-600)',
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

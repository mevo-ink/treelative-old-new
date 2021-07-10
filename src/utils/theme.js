import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  styles: {
    global: {
      '::-webkit-scrollbar': {
        width: '6px',
        height: '6px'
      },
      '::-webkit-scrollbar-track': {
        // transparent
      },
      '::-webkit-scrollbar-thumb': {
        background: 'var(--chakra-colors-blue-600)',
        borderRadius: '10px'
      },
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--chakra-colors-blue-600) transparent'
      }
    }
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'blue'
      },
      variants: {
        ghost: {
          _hover: { bg: 'blue.800' },
          _active: { bg: 'blue.800' }
        }
      }

    },
    Progress: {
      defaultProps: {
        colorScheme: 'blue'
      }
    },
    Checkbox: {
      defaultProps: {
        colorScheme: 'blue'
      }
    },
    Modal: {
      baseStyle: {
        closeButton: {
          color: 'blue.500'
        },
        dialog: {
          borderRadius: 'xl'
        }
      }
    },
    Drawer: {
      baseStyle: {
        closeButton: {
          color: 'blue.500'
        },
        dialog: {
          borderRadius: 'xl'
        }
      }
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: 'blue.900',
              boxShadow: '0 0 0 1px var(--chakra-colors-blue-700)'
            }
          }
        }
      }
    },
    Menu: {
      baseStyle: {
        item: {
          _hover: { bg: 'blue.600', color: 'white' },
          _focus: { bg: 'blue.600', color: 'white' },
          borderRadius: 'md'
        }
      }
    },
    Tabs: {
      defaultProps: {
        colorScheme: 'blue'
      },
      baseStyle: {
        tab: {
          _focus: { boxShadow: 'none' }
        }
      }
    },
    FormLabel: {
      baseStyle: {
        mb: '1',
        fontSize: 'sm',
        fontWeight: 'semi-bold'
      }
    },
    Badge: {
      defaultProps: {
        colorScheme: 'blue'
      }
    },
    Text: {
      baseStyle: {
        color: '#26114D',
        fontFamily: 'Lato'
      }
    }
  }
})

// console.log(theme)

export default theme

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
        scrollbarColor: 'var(--chakra-colors-blue-600) transparent',
        fontFamily: 'Lato'
      }
    }
  },
  components: {
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
        color: '#26114D'
      },
      variants: {
        'info-title': {
          fontWeight: '100',
          fontSize: '.5rem',
          lineHeight: '1.3em',
          userSelect: 'none'
        },
        info: {
          w: '85%',
          textAlign: 'center',
          fontSize: '1rem',
          lineHeight: '1.2em'
        }
      }
    },
    Button: {
      variants: {
        'editable-input': {
          h: 'auto',
          maxW: '80%',
          mt: '.5rem',
          p: '.5em .8em',
          fontWeight: '400',
          cursor: 'pointer',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
          background: 'hsla(0, 0%, 100%, .2)',
          boxShadow: '0px 3px 5px hsla(0, 0%, 0%, .2)',
          borderRadius: '20px',
          _hover: { bg: 'hsla(0, 0%, 50%, .2)' },
          _active: { bg: 'hsla(0, 0%, 50%, .2)' }
        }
      }
    }
  }
})

// console.log(theme)

export default theme

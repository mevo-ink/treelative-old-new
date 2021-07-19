import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
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
        color: 'hsla(0, 0%, 100%, 1)'
      },
      variants: {
        'info-title': {
          fontWeight: '100',
          fontSize: '.5rem',
          lineHeight: '1.3em',
          userSelect: 'none',
          color: 'hsla(261, 64%, 18%, 1)'
        },
        info: {
          w: '85%',
          textAlign: 'center',
          fontSize: '1rem',
          lineHeight: '1.2em',
          color: 'hsla(261, 64%, 18%, 1)'
        }
      }
    },
    Button: {
      variants: {
        'editable-input': {
          h: 'auto',
          maxW: '90%',
          mt: '.3rem',
          p: '.5em .8em',
          fontWeight: '400',
          cursor: 'pointer',
          wordBreak: 'break-word',
          whiteSpace: 'normal',
          color: 'hsla(261, 64%, 18%, 1)',
          background: 'hsla(0, 0%, 100%, .2)',
          boxShadow: '0px 3px 5px hsla(0, 0%, 0%, .2)',
          borderRadius: '999px',
          _hover: { bg: 'hsla(0, 0%, 50%, .2)' },
          _active: { bg: 'hsla(0, 0%, 50%, .2)' }
        },
        submit: {
          fontSize: '1rem',
          fontWeight: '400',
          color: 'white',
          cursor: 'pointer',
          bg: 'hsla(220, 100%, 60%, 1)',
          _hover: { bg: 'hsla(220, 100%, 40%, 1)' },
          _active: { bg: 'hsla(220, 100%, 40%, 1)' }
        }
      }
    },
    Modal: {
      baseStyle: {
        dialog: {
          color: 'white',
          borderRadius: '20px',
          border: 'hsla(0, 0%, 100%, 1) solid 2px',
          background: 'hsla(225, 36%, 4%, 1)'
        }
      }
    },
    Drawer: {
      baseStyle: {
        dialog: {
          color: 'hsla(0, 0%, 100%, .8)',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)': {
            WebkitBackdropFilter: 'blur(3px)',
            backdropFilter: 'blur(3px)',
            background: 'linear-gradient(115deg, hsla(0, 0%, 100%, .2), hsla(0, 0%, 100%, .05))'
          },
          /* slightly transparent fallback for Firefox (not supporting backdrop-filter) */
          '@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none))': {
            backgroundColor: 'hsla(225, 36%, 4%, 1)'
          }
        }
      }
    }
  }
})

// console.log(theme)

export default theme

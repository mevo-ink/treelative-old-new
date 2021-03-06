import { atom } from 'recoil'

export const activeNodePulseIDAtom = atom({
  key: 'activeNodePulseID',
  default: null
})

export const isMenuOpenAtom = atom({
  key: 'isMenuOpen',
  default: false
})

export const isEditModeAtom = atom({
  key: 'isEditMode',
  default: false
})

export const layoutMethodsAtom = atom({
  key: 'layoutMethods',
  default: {}
})

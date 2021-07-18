import { atom } from 'recoil'

// profile card related atoms
export const activeNodeIDAtom = atom({
  key: 'activeNodeID',
  default: null
})

export const isEditModeAtom = atom({
  key: 'isEditMode',
  default: false
})

// layout related atoms
export const layoutAtom = atom({
  key: 'layout',
  default: 'network'
})

export const networkMethodsAtom = atom({
  key: 'network',
  default: {}
})

export const mapMethodsAtom = atom({
  key: 'map',
  default: {}
})

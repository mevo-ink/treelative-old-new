import { atom } from 'recoil'

export const networkMethodsAtom = atom({
  key: 'network',
  default: {}
})

export const activeNodeIDAtom = atom({
  key: 'activeNodeID',
  default: null
})

export const isEditModeAtom = atom({
  key: 'isEditMode',
  default: false
})

export const layoutAtom = atom({
  key: 'layout',
  default: 'network'
})

export const mapMethodsAtom = atom({
  key: 'map',
  default: {}
})

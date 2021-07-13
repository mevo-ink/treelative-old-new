import { atom } from 'recoil'

export const networkMethodsAtom = atom({
  key: 'network',
  default: {}
})

export const networkStabilizedAtom = atom({
  key: 'stabilized',
  default: false
})

export const activeNodeIDAtom = atom({
  key: 'activeNodeID',
  default: null
})

export const isEditModeAtom = atom({
  key: 'isEditMode',
  default: false
})

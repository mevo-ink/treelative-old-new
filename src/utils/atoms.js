import { atom } from 'recoil'

import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()

// profile card related atoms
export const activeNodeIDAtom = atom({
  key: 'activeNodeID',
  default: null
})

export const activeNodePulseIDAtom = atom({
  key: 'activeNodePulseID',
  default: null
})

export const isEditModeAtom = atom({
  key: 'isEditMode',
  default: false
})

// layout related atoms
export const layoutAtom = atom({
  key: 'layout',
  default: 'network',
  effects_UNSTABLE: [persistAtom]
})

export const networkMethodsAtom = atom({
  key: 'network',
  default: {}
})

export const mapMethodsAtom = atom({
  key: 'map',
  default: {}
})

export const layoutMethodsAtom = atom({
  key: 'layoutMethods',
  default: {}
})

export const errorAtom = atom({
  key: 'error',
  default: null
})

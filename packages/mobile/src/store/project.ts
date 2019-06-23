import create from 'zustand'
import { PROJECT } from './constants'

const initialState = {
  [PROJECT.MODEL]: null,
  [PROJECT.TITLE]: null,
  [PROJECT.TYPE]: null,
}

const [useProjectStore] = create(set => ({
  ...initialState,

  actions: {
    reset: () => set(initialState),
    update: (field, payload) => set({ [field]: payload }),
  },
}))

export default useProjectStore

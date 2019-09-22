import create from 'zustand'
import { USER } from './constants'

const [useUserStore] = create(set => ({
  [USER.LOCATION]: '',
  [USER.BIO]: '',
  [USER.WEBSITE]: '',

  actions: {
    update: (field, payload) => set({ [field]: payload }),
  },
}))

export default useUserStore

import create from 'zustand'
import { USER } from './constants'

const [useUserStore] = create(set => ({
  [USER.FIRST_NAME]: '',
  [USER.LAST_NAME]: '',
  [USER.LOCATION]: '',
  [USER.BIO]: '',
  [USER.WEBSITE]: '',
  [USER.USERNAME]: '',

  actions: {
    update: (field, payload) => set({ [field]: payload }),
    initialState: payload => set(payload),
  },
}))

export default useUserStore

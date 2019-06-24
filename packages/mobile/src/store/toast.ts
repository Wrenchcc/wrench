import create from 'zustand'
import { TOAST_TYPES } from 'utils/enums'
import { TOAST } from './constants'

const initialState = {
  [TOAST.CONTENT]: null,
  [TOAST.SHOW]: false,
  [TOAST.TYPE]: TOAST_TYPES.NETWORK,
}

const [useToastStore] = create(set => ({
  ...initialState,

  actions: {
    show: payload => {
      if (payload.dismissAfter) {
        set({
          content: payload.content,
          show: true,
          type: payload.type,
        })
        setTimeout(() => set(initialState), payload.dismissAfter)
      }
    },
  },
}))

export default useToastStore

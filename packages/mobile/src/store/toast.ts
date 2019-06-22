import create from 'zustand'
import { TOAST_TYPES } from 'utils/enums'

const initialState = {
  content: null,
  show: false,
  type: TOAST_TYPES.NETWORK,
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

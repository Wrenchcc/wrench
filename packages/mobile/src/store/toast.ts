import create from 'zustand'
import { TOAST_TYPES } from 'utils/enums'

const initialState = {
  message: null,
  show: false,
  type: TOAST_TYPES.NETWORK,
}

const [useToastStore] = create(set => ({
  ...initialState,

  actions: {
    show: payload => {
      if (payload.dismissAfter) {
        // setTimeout(this.hideNotification, dismissAfter)
      }
    },
    hide: () => {},
  },
}))

export default useToastStore

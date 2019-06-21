import create from 'zustand'
import { TOAST_TYPES } from 'utils/enums'

const [useToastStore] = create(set => ({
  message: null,
  show: false,
  type: TOAST_TYPES.NETWORK,

  actions: {
    show: payload => {
      if (payload.dismissAfter) {
        // setTimeout(this.hideNotification, dismissAfter)
      }
    },
    // hide: () => {},
  },
}))

export default useToastStore

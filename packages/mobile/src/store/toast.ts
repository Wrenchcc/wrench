import create from 'zustand'
import NetInfo from '@react-native-community/netinfo'
import { TOAST_TYPES } from 'utils/enums'
import { TOAST } from './constants'

const initialState = {
  [TOAST.CONTENT]: null,
  [TOAST.SHOW]: false,
  [TOAST.TYPE]: TOAST_TYPES.NETWORK,
}

const [useToastStore, api] = create(set => ({
  ...initialState,

  actions: {
    show: payload => {
      set({
        content: payload.content,
        show: true,
        type: payload.type,
      })

      if (payload.dismissAfter) {
        setTimeout(() => set(initialState), payload.dismissAfter)
      }
    },
  },
}))

NetInfo.isConnected.addEventListener('connectionChange', isConnected => {
  if (isConnected) {
    api.setState(initialState)
  } else {
    api.setState({
      show: true,
    })
  }
})

export function showSpamToast() {
  api.setState({
    show: true,
    type: TOAST_TYPES.SPAM,
  })

  setTimeout(() => api.setState(initialState), 6000)
}

export default useToastStore

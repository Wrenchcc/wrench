import { makeVar } from '@apollo/client'
import NetInfo from '@react-native-community/netinfo'
import { TOAST_TYPES } from 'utils/enums'

export const PROJECT = {
  MODEL: 'model',
  TITLE: 'title',
  TYPE: 'type',
}

export const POST = {
  CAPTION: 'caption',
  FILES: 'files',
  PROJECT_ID: 'projectId',
  SELECED_FILES: 'selectedFiles',
  SELECTED_ID: 'selectedId',
  IS_POSTING: 'isPosting',
}

export const TOAST = {
  CONTENT: 'content',
  SHOW: 'show',
  TYPE: 'type',
}

export const mentionVar = makeVar('')

const initialProjectState = {
  [PROJECT.MODEL]: null,
  [PROJECT.TITLE]: null,
  [PROJECT.TYPE]: null,
}

export const projectVar = makeVar(initialProjectState)
export const updateProjectVar = (field, payload) => projectVar({ [field]: payload })
export const resetProjectVar = () => projectVar(initialProjectState)

const initialToastState = {
  [TOAST.CONTENT]: null,
  [TOAST.SHOW]: false,
  [TOAST.TYPE]: TOAST_TYPES.NETWORK,
}

export const toastVar = makeVar(initialToastState)
export const resetToastVar = () => toastVar(initialProjectState)

export const showToast = (payload) => {
  toastVar({
    content: payload.content,
    show: true,
    type: payload.type,
  })

  if (payload.dismissAfter) {
    setTimeout(() => toastVar(initialToastState), payload.dismissAfter)
  }
}

NetInfo.addEventListener((state) => {
  if (state.isConnected) {
    toastVar(initialToastState)
  } else {
    toastVar({ show: true })
  }
})

export function showSpamToast() {
  toastVar({
    show: true,
    type: TOAST_TYPES.SPAM,
  })

  setTimeout(() => toastVar(initialToastState), 6000)
}

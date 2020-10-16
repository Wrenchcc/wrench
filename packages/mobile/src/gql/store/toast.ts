import { makeVar } from '@apollo/client'
import { TOAST_TYPES } from 'utils/enums'
import { TOAST } from './constants'

type ToastProps = {
  content?: string
  show?: boolean
  type?: TOAST_TYPES
  dismissAfter?: number
}

const initialState = {
  [TOAST.CONTENT]: '',
  [TOAST.SHOW]: false,
  [TOAST.TYPE]: TOAST_TYPES.SPAM,
}

export const toastVar = makeVar(initialState)

export const show = ({
  content,
  show = true,
  type = TOAST_TYPES.SPAM,
  dismissAfter,
}: ToastProps) => {
  toastVar({
    content,
    show,
    type,
    dismissAfter,
  })
}

export const hide = () => toastVar({ ...toastVar(), show: false })
export const reset = () => toastVar(initialState)

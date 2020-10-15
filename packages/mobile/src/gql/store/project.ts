import { makeVar } from '@apollo/client'
import { PROJECT } from './constants'

const initialState = {
  [PROJECT.MODEL]: null,
  [PROJECT.TITLE]: null,
  [PROJECT.TYPE]: null,
}

export const projectVar = makeVar(initialState)
export const selectedIdVar = makeVar('')

export const update = (field, payload) => projectVar({ ...projectVar(), [field]: payload })
export const reset = () => projectVar(initialState)

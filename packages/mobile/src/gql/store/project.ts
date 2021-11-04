import { makeVar } from '@apollo/client'
import { storage } from 'utils/storage'
import { SELECTED_PROJECT_ID_KEY } from 'utils/storage/constants'
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

export const setProjectId = (id) => {
  selectedIdVar(id)
  storage.set(SELECTED_PROJECT_ID_KEY, id)
}

export const getProjectId = () => storage.getString(SELECTED_PROJECT_ID_KEY)

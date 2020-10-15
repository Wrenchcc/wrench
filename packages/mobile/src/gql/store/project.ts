import { makeVar } from '@apollo/client'
import AsyncStorage from '@react-native-community/async-storage'
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

export const setProjectId = async (id) => {
  selectedIdVar(id)

  await AsyncStorage.setItem(SELECTED_PROJECT_ID_KEY, id)
}

export const getProjectId = async () => AsyncStorage.getItem(SELECTED_PROJECT_ID_KEY)

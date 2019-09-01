import create from 'zustand'
import AsyncStorage from '@react-native-community/async-storage'
import * as MediaLibrary from 'react-native-media-library'
import { SELECTED_PROJECT_KEY } from 'utils/storage/constants'
import { findIndex, propEq, assocPath, pathOr } from 'ramda'
import { client, CURRENT_USER_PROJECTS_QUERY } from 'gql'
import { logError } from 'utils/sentry'
import { POST } from './constants'

const MAX_SELECTED_FILES = 10

const initialState = {
  [POST.CAPTION]: null,
  [POST.FILES]: [],
  [POST.IS_POSTING]: false,
  [POST.PROJECT_ID]: null,
  [POST.SELECED_FILES]: [],
  [POST.SELECTED_ID]: null,
}

const [usePostStore, api] = create((set, get) => ({
  ...initialState,

  actions: {
    addFiles: payload =>
      set({
        files: payload,
      }),

    onSelect: async payload => {
      const state = get()

      const currentId = payload.id
      const selectedFiles = state.selectedFiles
      const isAdded = selectedFiles.some(file => file.id === currentId)
      const isPrevious = state.selectedId === currentId
      const currentIndex = findIndex(propEq('id', currentId))(selectedFiles)

      // If camera
      if (payload.camera && !selectedFiles.length) {
        // Save file
        try {
          const file = await MediaLibrary.createAssetAsync(payload.uri)

          return set({
            selectedFiles: [{ ...file, camera: true }],
            selectedId: file.id,
          })
        } catch (err) {
          logError(err)
        }
      }

      if (!isPrevious && !isAdded && selectedFiles.length === MAX_SELECTED_FILES) {
        return state
      }

      const updatedFiles =
        isPrevious && isAdded
          ? selectedFiles.filter(file => file.id !== currentId)
          : selectedFiles.concat(payload)

      const selectedId = isPrevious
        ? updatedFiles.length &&
          updatedFiles[currentIndex > 0 ? currentIndex - 1 : updatedFiles.length - 1 || 0].id
        : payload.id

      return set({
        selectedFiles: updatedFiles,
        selectedId,
      })
    },

    onEdit: payload =>
      set(state => {
        const currentIndex = findIndex(propEq('id', state.selectedId))(state.selectedFiles)

        return {
          selectedFiles: assocPath([currentIndex, 'crop'], payload, state.selectedFiles),
        }
      }),

    reset: () =>
      set({
        [POST.CAPTION]: null,
        [POST.FILES]: [],
        [POST.IS_POSTING]: false,
        [POST.SELECED_FILES]: [],
        [POST.SELECTED_ID]: null,
      }),

    setIsPosting: payload => set({ isPosting: payload }),

    update: async (field, payload) => {
      if (field === POST.PROJECT_ID) {
        return saveSelectedProjectId(payload)
      }
      set({ [field]: payload })
    },
  },
}))

export async function loadSelectedProjectId() {
  const savedId = await AsyncStorage.getItem(SELECTED_PROJECT_KEY)

  if (savedId) {
    api.setState({ [POST.PROJECT_ID]: savedId })
  } else {
    const { data } = await client.query({ query: CURRENT_USER_PROJECTS_QUERY })
    const id = pathOr(null, ['user', 'projects', 'edges', 0, 'node', 'id'], data)
    api.setState({ [POST.PROJECT_ID]: id })
  }
}

export async function saveSelectedProjectId(id) {
  api.setState({ [POST.PROJECT_ID]: id })
  AsyncStorage.setItem(SELECTED_PROJECT_KEY, id)
}

export async function removeSelectedProjectId(id) {
  const savedId = await AsyncStorage.getItem(SELECTED_PROJECT_KEY)

  if (savedId === id) {
    await AsyncStorage.removeItem(SELECTED_PROJECT_KEY)
  }
}

export default usePostStore

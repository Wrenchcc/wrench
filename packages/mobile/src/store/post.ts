import create from 'zustand'
import AsyncStorage from '@react-native-community/async-storage'
import { SELECTED_PROJECT_KEY } from 'utils/storage/constants'
import { findIndex, propEq, assocPath, pathOr } from 'ramda'
import { client, CURRENT_USER_PROJECTS_QUERY } from 'gql'
import { POST } from './constants'

const MAX_SELECTED_FILES = 10

const initialState = {
  [POST.CAPTION]: null,
  [POST.FILES]: [],
  [POST.SELECTED_ID]: null,
  [POST.PROJECT_ID]: null,
  [POST.IS_POSTING]: false,
}

const [usePostStore, api] = create(set => ({
  ...initialState,

  actions: {
    onSelect: payload =>
      set(state => {
        const currentId = payload.id
        const files = state.files
        const isAdded = files.some(file => file.id === currentId)
        const isPrevious = state.selectedId === currentId
        const currentIndex = findIndex(propEq('id', currentId))(files)

        // If camera
        if (payload.camera && !files.length) {
          const id = payload.uri

          return {
            files: [
              {
                id,
                ...payload,
              },
            ],
            selectedId: id,
          }
        }

        if (!isPrevious && !isAdded && files.length === MAX_SELECTED_FILES) {
          return state
        }

        const updatedFiles =
          isPrevious && isAdded
            ? files.filter(file => file.id !== currentId)
            : files.concat(payload)

        const selectedId = isPrevious
          ? updatedFiles.length &&
            updatedFiles[currentIndex > 0 ? currentIndex - 1 : updatedFiles.length - 1 || 0].id
          : payload.id

        return {
          files: updatedFiles,
          selectedId,
        }
      }),

    onEdit: payload =>
      set(state => {
        const currentIndex = findIndex(propEq('id', state.selectedId))(state.files)

        return {
          files: assocPath([currentIndex, 'crop'], payload, state.files),
        }
      }),

    reset: () =>
      set({
        [POST.CAPTION]: null,
        [POST.FILES]: [],
        [POST.SELECTED_ID]: null,
        [POST.IS_POSTING]: false,
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

export default usePostStore

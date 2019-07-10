import create from 'zustand'
import AsyncStorage from '@react-native-community/async-storage'
import { SELECTED_PROJECT_KEY } from 'utils/storage/constants'
import { IMAGE_EDITOR_SIZE } from 'features/project/components/ImageEditor'
import { findIndex, propEq } from 'ramda'
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

    onEdit: payload => {
      const [scale, originX, originY] = payload
      const size = scale * IMAGE_EDITOR_SIZE

      set(state => ({
        crop: {
          [state.selectedId]: {
            height: size,
            originX,
            originY,
            width: size,
          },
        },
      }))
    },

    reset: () => set(initialState),

    setIsPosting: payload => set({ isPosting: payload }),

    update: async (field, payload) => {
      if (field === POST.PROJECT_ID) {
        AsyncStorage.setItem(SELECTED_PROJECT_KEY, payload)
      }
      set({ [field]: payload })
    },
  },
}))

async function initSelectedProjectId() {
  const id = await AsyncStorage.getItem(SELECTED_PROJECT_KEY)
  api.setState({ [POST.PROJECT_ID]: id })
}

initSelectedProjectId()

export default usePostStore

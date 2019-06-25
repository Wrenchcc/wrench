import create from 'zustand'
import AsyncStorage from '@react-native-community/async-storage'
import { SELECTED_PROJECT_KEY } from 'utils/storage/constants'
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
        const isAdded = state.files.some(file => file.id === currentId)
        const isPrevious = state.selectedId === currentId
        const currentIndex = findIndex(propEq('id', currentId))(state.files) || state.files.length
        const selectedId = isPrevious
          ? state.files.length && state.files[currentIndex - 1 || 0].id
          : payload.id

        if (!isPrevious && !isAdded && state.files.length === MAX_SELECTED_FILES) {
          return state
        }

        return {
          files:
            isPrevious && isAdded
              ? state.files.filter(file => file.id !== currentId)
              : state.files.concat(payload),
          selectedId,
        }
      }),

    onEdit: payload => {
      // console.log(payload)
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

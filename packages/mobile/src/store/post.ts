import create from 'zustand'
import AsyncStorage from '@react-native-community/async-storage'
import { SELECTED_PROJECT_KEY } from 'utils/storage/constants'
import { findIndex, propEq } from 'ramda'

const MAX_SELECTED_FILES = 10

const initialState = {
  caption: null,
  files: [],
  id: null,
  isPosting: false,
  projectId: null,
}

const [usePostStore, api] = create(set => ({
  ...initialState,

  actions: {
    onSelect: payload =>
      set(state => {
        const currentId = payload.id
        const isAdded = state.files.some(file => file.id === currentId)
        const prevSelected = state.id === currentId
        const index = findIndex(propEq('id', currentId))(state.files)
        const id = currentId //prevSelected ? state.files[index - 1 || 0].id : payload.id

        // console.log(
        //   state.files.length > 0
        //     ? prevSelected
        //       ? state.files[index - 1 || 0].id
        //       : payload.id
        //     : null
        // )

        if (!prevSelected && !isAdded && state.files.length === MAX_SELECTED_FILES) {
          return state
        }

        return {
          files:
            prevSelected && isAdded
              ? state.files.filter(file => file.id !== currentId)
              : state.files.concat(payload),
          id,
        }
      }),

    onEdit: () => {},

    reset: () => set(initialState),

    setIsPosting: payload => set({ isPosting: payload }),
    update: async (field, payload) => {
      if (field === 'id') {
        AsyncStorage.setItem(SELECTED_PROJECT_KEY, payload)
      }
      set({ [field]: payload })
    },
  },
}))

async function initSelectedProject() {
  const id = await AsyncStorage.getItem(SELECTED_PROJECT_KEY)
  api.setState({ id })
}

initSelectedProject()

export default usePostStore

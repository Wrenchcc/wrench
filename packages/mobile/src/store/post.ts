import create from 'zustand'
import { findIndex, propEq } from 'ramda'

const MAX_SELECTED_FILES = 10

const [usePostStore] = create(set => ({
  caption: null,
  files: [],
  id: null,
  isPosting: false,
  projectId: null,

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

    setIsPosting: payload => set({ isPosting: payload }),
    update: (field, payload) => set({ [field]: payload }),
  },
}))

export default usePostStore

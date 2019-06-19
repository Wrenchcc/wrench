import create from 'zustand'

const MAX_SELECTED_FILES = 10
// if (state.files.length === MAX_SELECTED_FILES) {
//   return state
// }

const [usePostStore] = create(set => ({
  caption: null,
  files: [],
  id: null,
  isPosting: false,
  projectId: null,

  actions: {
    onSelect: payload =>
      set(state => ({
        ...state,
        files:
          state.id === payload.id && state.files.some(file => file.id === payload.id)
            ? state.files.filter(file => file.id !== payload.id)
            : state.files.concat(payload),
        id: payload.id, // TODO: Select next index when remove
      })),

    onEdit: () => {},

    setIsPosting: payload => set({ isPosting: payload }),
    update: (field, payload) => set({ [field]: payload }),
    reset: () => set(initialState),
  },
}))

export default usePostStore

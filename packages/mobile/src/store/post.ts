import create from 'zustand'

const [usePostStore] = create(set => ({
  caption: null,
  files: [],
  isPosting: false,
  projectId: null,
  selectedId: null,

  actions: {
    // If 10 do nothing
    // || state.selectedId === payload.id
    onSelect: payload =>
      set(state => {
        return {
          ...state,
          files: state.files.some(file => file.id === payload.id)
            ? state.files.filter(file => file.id !== payload.id)
            : state.files.concat(payload),
          selectedId: payload.id,
        }
      }),

    update: field => {},
  },
}))

export default {
  useStore,
}

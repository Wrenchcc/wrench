import create from 'zustand'

const [useStore, api] = create(set => ({
  post: {
    caption: null,
    files: [],
    isPosting: false,
    projectId: null,
    selectedId: null,
  },

  banner: {},

  project: {},

  actions: {
    // If found in store remove
    // Else add
    // If 10 do nothing
    // return state.files[payload]
    selectFile: payload =>
      set(state => ({
        ...state,
        post: {
          ...state.post,
          files: [...state.post.files, payload],
          selectedId: payload.id,
        },
      })),
  },
}))

export { useStore, api }

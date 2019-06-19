import create from 'zustand'
import { BANNER_TYPES } from 'utils/enums'

const [useStore, api] = create(set => ({
  post: {
    caption: null,
    files: [],
    isPosting: false,
    projectId: null,
    selectedId: null,
  },

  banner: {
    message: null,
    show: false,
    type: BANNER_TYPES.NETWORK,
  },

  project: {
    id: null,
    model: null,
    title: null,
    type: null,
  },

  actions: {
    // if selected ID already in store, remove
    // else add
    // If 10 do nothing

    onSelect: payload =>
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

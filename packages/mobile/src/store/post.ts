import { action } from 'easy-peasy'

const initialState = {
  caption: null,
  files: [],
  isPosting: false,
  projectId: null,
  selected: null,
}

export default {
  ...initialState,

  addFile: action((state, payload) => {
    return { ...state, files: [...state.files, payload] }
  }),

  editFile: action((state, payload) => {
    // return state.files[payload]
  }),

  selectFile: action((state, payload) => {
    // If found in store remove
    // Else add
    // If 10 do nothing
    // return state.files[payload]
  }),

  reset: action(() => ({
    ...initialState,
  })),
}

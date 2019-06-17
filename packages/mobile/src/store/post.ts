import { action } from 'easy-peasy'

export default {
  caption: null,
  files: [],
  isPosting: false,
  projectId: null,
  selected: null,

  addFile: action((state, payload) => {
    return { ...state, files: [...state.files, payload] }
  }),

  editFile: action((state, payload) => {
    // return state.files[payload]
  }),

  selectFile: action((state, payload) => {
    // return state.files[payload]
  }),
}

import create from 'zustand'

const [usePostStore] = create(set => ({
  actions: {
    update: field => {},
  },
}))

export default {
  useStore,
}

import create from 'zustand'

const [useMentionStore] = create(set => ({
  query: '',

  actions: {
    updateQuery: query => set({ query }),
  },
}))

export default useMentionStore

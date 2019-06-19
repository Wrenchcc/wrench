import create from 'zustand'

const [useProjectStore] = create(set => ({
  model: null,
  title: null,
  type: null,

  actions: {
    update: (field, payload) => set({ [field]: payload }),
  },
}))

export default useProjectStore

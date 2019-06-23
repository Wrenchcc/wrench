import create from 'zustand'

const initialState = {
  model: null,
  title: null,
  type: null,
}

const [useProjectStore] = create(set => ({
  ...initialState,

  actions: {
    reset: () => set(initialState),
    update: (field, payload) => set({ [field]: payload }),
  },
}))

export default useProjectStore

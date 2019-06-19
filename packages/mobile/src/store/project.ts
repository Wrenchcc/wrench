import create from 'zustand'

const initialState = {
  model: null,
  title: null,
  type: null,
}

const [useProjectStore] = create(set => ({
  ...initialState,

  actions: {
    update: (field, payload) => set({ [field]: payload }),
    reset: () => set(initialState),
  },
}))

export default useProjectStore

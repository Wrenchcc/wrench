import search from './search'

export default {
  Query: {
    search,
  },
  SearchResultNode: {
    __resolveType(root) {
      if (root.avatarUrl) {
        return 'User'
      }

      if (root.slug) {
        return 'Project'
      }

      if (root.model) {
        return 'Model'
      }

      return null
    },
  },
}

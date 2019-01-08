import search from './search'

export default {
  Query: {
    search,
  },
  SearchResultNode: {
    __resolveType(root, context, info) {
      if (root.avatarUrl) {
        return 'User'
      }

      if (root.slug) {
        return 'Project'
      }

      if (root.name) {
        return 'Model'
      }

      return null
    },
  },
}

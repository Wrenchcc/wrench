import search from './search'

export default {
  Query: {
    search,
  },
  SearchResultNode: {
    __resolveType(root) {
      if (root.username) {
        return 'User'
      }

      if (root.projectTypeId) {
        return 'Project'
      }

      if (root.model) {
        return 'Model'
      }

      return {}
    },
  },
}

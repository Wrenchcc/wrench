import totalUsers from './totalUsers'
import totalComments from './totalComments'
import totalProjects from './totalProjects'
import totalPosts from './totalPosts'
import totalFiles from './totalFiles'

export default {
  Query: {
    meta: () => ({}),
  },
  Meta: {
    totalUsers,
    totalComments,
    totalProjects,
    totalPosts,
    totalFiles,
  },
}

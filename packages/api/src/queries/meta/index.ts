import totalUsers from './totalUsers'
import totalComments from './totalComments'
import totalProjects from './totalProjects'
import totalPosts from './totalPosts'
import totalFiles from './totalFiles'
// import growth from './growth'

export default {
  Query: {
    meta: () => ({}),
    // growth,
  },
  Meta: {
    totalUsers,
    totalComments,
    totalProjects,
    totalPosts,
    totalFiles,
  },
}

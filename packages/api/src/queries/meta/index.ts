import totalUsers from './totalUsers'
import totalUsersToday from './totalUsersToday'
import totalPostsToday from './totalPostsToday'
import totalProjectsToday from './totalProjectsToday'
import totalCommentsToday from './totalCommentsToday'
import totalFilesToday from './totalFilesToday'
import totalComments from './totalComments'
import totalProjects from './totalProjects'
import totalPosts from './totalPosts'
import totalFiles from './totalFiles'
import growth from './growth'

export default {
  Query: {
    meta: () => ({}),
    growth,
  },
  Meta: {
    totalUsers,
    totalUsersToday,
    totalPostsToday,
    totalProjectsToday,
    totalCommentsToday,
    totalFilesToday,
    totalComments,
    totalProjects,
    totalPosts,
    totalFiles,
  },
}

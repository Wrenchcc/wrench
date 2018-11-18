import { authenticateUser, refreshToken } from './mutations/user/auth'
import addPost from './mutations/post/addPost'
import preSignUrls from './mutations/upload/preSignUrls'
import currentUser from './queries/user/currentUser'
import comments from './fixtures/comments'
import deletePost from './mutations/post/deletePost'
import editUser from './mutations/user/editUser'
import followers from './fixtures/followers'
import followProject from './mutations/project/followProject'
import generateUser from './fixtures/generateUser'
import notifications from './fixtures/notifications'
import pageInfo from './fixtures/pageInfo'
import posts from './fixtures/posts'
import projectCategories from './fixtures/projectCategories'
import projects from './fixtures/projects'
import models from './fixtures/models'
import projectsConnection from './fixtures/projectsConnection'
import projectSuggestions from './fixtures/projectSuggestions'
import settings from './fixtures/settings'
import toggleNotificationSettings from './mutations/user/toggleNotificationSettings'
import users from './fixtures/users'

const getSearchEdge = type => {
  if (type === 'USERS') {
    return users()
  }
  if (type === 'PROJECTS') {
    return projects()
  }

  if (type === 'MODELS') {
    return models()
  }
}

// TODO: Change to sub queries and mutations in directories
const postsConnection = {
  edges: posts(),
  pageInfo,
}

const followingProjects = {
  edges: projects(),
  pageInfo,
}

const followersConnection = {
  edges: users(),
  pageInfo,
  totalCount: 4000,
}

export default {
  Query: {
    comments: (root, args, ctx, info) => ({
      edges: comments(),
      pageInfo,
    }),
    followers: (root, args, ctx, info) => followersConnection,
    posts: (root, args, ctx, info) => ({
      edges: posts(),
      pageInfo,
    }),
    project: (root, args, ctx, info) => ({
      dynamicLink: 'https://wrench.page.link/KFko',
      followersConnection,
      id: '123',
      postsConnection,
      projectPermissions: {
        isFollower: false,
        isOwner: false,
      },
      slug: 'the-natural',
      title: 'The Natural',
      user: generateUser(),
    }),
    projectCategories: (root, args, ctx, info) => projectCategories,
    projectSuggestions: (root, args, ctx, info) => projectSuggestions,
    projects: (root, args, ctx, info) => projectsConnection,
    user: (root, args, ctx, info) => ({
      currentUser,
      ...generateUser(),
      followingProjects,
      postsConnection,
    }),
    notifications: (root, args, ctx, info) => ({
      edges: notifications(),
      pageInfo,
    }),
    search: (root, { query, type }, ctx, info) => ({
      edges: getSearchEdge(type),
      pageInfo,
    }),
  },
  SearchResultNode: {
    /* tslint:disable */
    __resolveType(root, context, info) {
      if (root.username) {
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
    /* tslint:enable */
  },
  Mutation: {
    addPost,
    authenticateUser,
    deletePost,
    editUser,
    followProject,
    preSignUrls,
    refreshToken,
    toggleNotificationSettings,
  },
}

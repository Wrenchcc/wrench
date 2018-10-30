import { authenticateUser, refreshToken } from './mutations/user/auth'
import addPost from './mutations/post/addPost'
import preSignUrls from './mutations/upload/preSignUrls'
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
  pageInfo,
  edges: posts(),
}

const followingProjects = {
  pageInfo,
  edges: projects(),
}

const followersConnection = {
  totalCount: 4000,
  edges: users(),
  pageInfo,
}

export default {
  Query: {
    posts: (root, args, ctx, info) => ({
      pageInfo,
      edges: posts(),
    }),
    project: (root, args, ctx, info) => ({
      id: '123',
      slug: 'the-natural',
      title: 'The Natural',
      dynamicLink: 'https://wrench.page.link/KFko',
      projectPermissions: {
        isFollower: false,
        isOwner: false,
      },
      user: generateUser(),
      followersConnection,
      postsConnection,
    }),
    projectSuggestions: (root, args, ctx, info) => projectSuggestions,
    projectCategories: (root, args, ctx, info) => projectCategories,
    projects: (root, args, ctx, info) => projectsConnection,
    followers: (root, args, ctx, info) => followersConnection,
    comments: (root, args, ctx, info) => ({
      pageInfo,
      edges: comments(),
    }),
    user: (root, args, ctx, info) => ({
      ...generateUser(),
      postsConnection,
      followingProjects,
    }),
    currentUser: (root, args, ctx, info) => {
      if (!ctx.user) {
        throw new Error('tokenExpired')
      }

      return {
        ...generateUser(),
        interestedIn: [
          {
            id: '123',
          },
        ],
        settings,
        postsConnection,
        projectsConnection,
      }
    },
    notifications: (root, args, ctx, info) => ({
      pageInfo,
      edges: notifications(),
    }),
    search: (root, { query, type }, ctx, info) => ({
      pageInfo,
      edges: getSearchEdge(type),
    }),
  },
  SearchResultNode: {
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
  },
  Mutation: {
    authenticateUser,
    refreshToken,
    editUser,
    toggleNotificationSettings,
    followProject,
    deletePost,
    addPost,
    preSignUrls,
  },
}

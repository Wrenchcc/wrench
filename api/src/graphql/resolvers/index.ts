import { authenticateUser, refreshToken } from "../mutations/auth";
import editUser from "../mutations/editUser";
import toggleNotificationSettings from "../mutations/toggleNotificationSettings";
import posts from "../../fixtures/posts";
import generateUser from "../../fixtures/generateUser";
import users from "../../fixtures/users";
import followers from "../../fixtures/followers";
import comments from "../../fixtures/comments";
import projects from "../../fixtures/projects";
import notifications from "../../fixtures/notifications";
import projectCategories from "../../fixtures/projectCategories";

const pageInfo = {
  hasNextPage: true,
  hasPreviousPage: false
};

const postsConnection = {
  edges: posts(),
  pageInfo
};

const followersConnection = {
  totalCount: 4000,
  edges: users(),
  pageInfo
};

const projectsConnection = {
  pageInfo,
  edges: projects()
};

export default {
  Query: {
    posts: (root, args, ctx, info) => ({
      pageInfo,
      edges: posts()
    }),
    project: (root, args, ctx, info) => ({
      id: "123",
      slug: "the-natural",
      title: "The Natural",
      owner: generateUser(),
      dynamicLink: "https://wrench.page.link/yT3A",
      projectPermissions: {
        isFollower: true,
        isOwner: true
      },
      followersConnection,
      postsConnection
    }),
    projectCategories: (root, args, ctx, info) => projectCategories,
    projects: (root, args, ctx, info) => projectsConnection,
    followers: (root, args, ctx, info) => followersConnection,
    comments: (root, args, ctx, info) => ({
      pageInfo,
      edges: comments()
    }),
    user: (root, args, ctx, info) => ({
      ...generateUser(),
      postsConnection
    }),
    currentUser: (root, args, ctx, info) => {
      if (!ctx.user) {
        throw new Error("tokenExpired");
      }

      return {
        ...generateUser(),
        interestedIn: [
          {
            id: "123"
          }
        ],
        settings: {
          notifications: {
            types: {
              newFollower: {
                push: false
              },
              newComment: {
                push: false
              },
              newMention: {
                push: true
              },
              newArticle: {
                push: false
              },
              similarProjects: {
                push: true
              },
              productAnnouncements: {
                push: true
              }
            }
          }
        },
        postsConnection,
        projectsConnection
      };
    },
    notifications: (root, args, ctx, info) => ({
      pageInfo,
      edges: notifications()
    }),
    search: (root, { query, type }, ctx, info) => ({
      pageInfo,
      edges: type === "USERS" ? users() : projects()
    })
  },
  SearchResultNode: {
    __resolveType(obj, context, info) {
      if (obj.username) {
        return "User";
      }

      if (obj.slug) {
        return "Project";
      }

      return null;
    }
  },
  Mutation: {
    authenticateUser,
    refreshToken,
    editUser,
    toggleNotificationSettings
  }
};

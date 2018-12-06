import project from '../../fixtures/projects'

// TODO: Use context user
export default (_, args, ctx) => ({
  ...project()[0].node,
  id: args.id,
  followersConnection: {
    totalCount: 1300 + 1,
    edges: [],
  },
  projectPermissions: {
    isOwner: false,
    isFollower: true,
  },
})

import project from "../../fixtures/projects";
import followers from "../../fixtures/followers";

// TODO: Use context user
export default (_, args, ctx) => ({
  ...project()[0].node,
  followersConnection: {
    totalCount: 1300 + 1,
    edges: followers()
  },
  projectPermissions: {
    isOwner: false,
    isFollower: true
  }
});

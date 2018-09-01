import user from "../../fixtures/generateUser";
export default (_, args, ctx) => ({
  ...user(),
  settings: {
    notifications: {
      types: {
        newFollower: {
          push: true
        },
        newComment: {
          push: true
        },
        newMention: {
          push: true
        },
        newArticle: {
          push: true
        },
        similarProjects: {
          push: true
        },
        productAnnouncements: {
          push: true
        }
      }
    }
  }
});

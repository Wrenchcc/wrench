import generateUser from "./generateUser";
import generateId from "./generateId";

export default () => [
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("1"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "COMMENT",
      user: generateUser("2"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      comment: {
        id: "1"
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "REPLY",
      user: generateUser("3"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      comment: {
        id: "1"
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("4"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("5"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("6"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("7"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("8"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("9"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("10"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "FOLLOW",
      user: generateUser("11"),
      createdAt: Date.now() - 60 * 1000,
      updatedAt: Date.now() - 60 * 1000,
      isSeen: false,
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("1")
      },
      comment: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          "Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ",
        user: generateUser()
      }
    }
  }
];

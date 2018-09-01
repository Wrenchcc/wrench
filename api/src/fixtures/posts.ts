import generateUser from "./generateUser";
import comments from "./comments";
import generateId from "./generateId";
import images from "./images";

export default () => [
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      type: "image", // || video || text
      createdAt: 176347295,
      caption:
        "During the build the already minimalistic lines of the BMW have been cleared. http://www.bikeexif.com",
      videos: null,
      imagesConnection: { edges: images() },
      user: generateUser(),
      commentConnection: {
        totalCount: 1300,
        edges: comments().slice(0, 2)
      },
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
      }
    }
  },
  {
    cursor: Buffer.from("2").toString("base64"),
    node: {
      id: generateId(),
      type: "text", // || video || text
      createdAt: 176347295,
      caption:
        "I used my favorite material, steel. @pontus Following I started over with a wireframe out of steel rods. It allowed me to check the shape constantly and it was much easier to adj…",
      videos: null,
      imagesConnection: { edges: images() },
      user: generateUser(),
      commentConnection: {
        totalCount: 1300,
        edges: comments().slice(0, 2)
      },
      project: {
        id: "1",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: true,
          isFollower: true
        },
        slug: "the-natural",
        title: "Honda CB750 1981",
        owner: generateUser("2")
      }
    }
  },
  {
    cursor: Buffer.from("3").toString("base64"),
    node: {
      id: generateId(),
      type: "image", // || video
      createdAt: 176347295,
      caption:
        "The job I've not been looking forward to. https://wrench.cc Sanding the cowl and the front fender for the GS550",
      videos: null,
      imagesConnection: { edges: images() },
      user: generateUser(),
      commentConnection: {
        totalCount: 1300,
        edges: comments().slice(0, 2)
      },
      project: {
        id: "3",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: false
        },
        slug: "the-natural",
        title: "R100 Scrambler",
        owner: generateUser("3")
      }
    }
  },
  {
    cursor: Buffer.from("4").toString("base64"),
    node: {
      id: generateId(),
      type: "image", // || video
      createdAt: 176347295,
      caption:
        "The job I've not been looking forward to. Sanding the cowl and the front fender for the GS550",
      videos: null,
      imagesConnection: { edges: images() },
      user: generateUser(),
      commentConnection: {
        totalCount: 1300,
        edges: comments().slice(0, 2)
      },
      project: {
        id: "3",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: true,
          isFollower: true
        },
        slug: "the-natural",
        title: "The Natural CB750",
        owner: generateUser("4")
      }
    }
  },
  {
    cursor: Buffer.from("5").toString("base64"),
    node: {
      id: generateId(),
      type: "image", // || video
      createdAt: 176347295,
      caption:
        "The job I've not been looking forward to. Sanding the cowl and the front fender for the GS550",
      videos: null,
      imagesConnection: { edges: images() },

      user: generateUser(),
      commentConnection: {
        totalCount: 1300,
        edges: comments().slice(0, 2)
      },
      project: {
        id: "3",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: false
        },
        slug: "the-natural",
        title: "BMW R100 Project",
        owner: generateUser("5")
      }
    }
  },
  {
    cursor: Buffer.from("6").toString("base64"),
    node: {
      id: generateId(),
      type: "text", // || video
      createdAt: 176347295,
      caption:
        "The job I've not been looking forward to. Sanding the cowl and the front fender for the GS550",
      videos: null,
      imagesConnection: { edges: images() },

      user: generateUser(),
      commentConnection: {
        totalCount: 1300,
        edges: comments().slice(0, 2)
      },
      project: {
        id: "3",
        dynamicLink: "https://wrench.page.link/yT3A",
        followersConnection: {
          totalCount: 4000
        },
        projectPermissions: {
          isOwner: false,
          isFollower: true
        },
        slug: "the-natural",
        title: "Scrambler",
        owner: generateUser("6")
      }
    }
  }
];

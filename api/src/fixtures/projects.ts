import { take } from "ramda";
import posts from "./posts";
import generateUser from "./generateUser";
import images from "./images";
import followers from "./followers";
import generateId from "./generateId";

export default () => [
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      slug: "the-natural",
      title: "BMW R100 Project",
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers()
      },
      dynamicLink: "https://wrench.page.link/yT3A",
      projectPermissions: {
        isOwner: false,
        isFollower: false
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      slug: "the-natural",
      title: "My Honda CB650",
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers()
      },
      dynamicLink: "https://wrench.page.link/yT3A",
      projectPermissions: {
        isOwner: false,
        isFollower: false
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      slug: "the-natural",
      title: "The Natural",
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers()
      },
      dynamicLink: "https://wrench.page.link/yT3A",
      projectPermissions: {
        isOwner: false,
        isFollower: false
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      slug: "the-natural",
      title: "The Natural",
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers()
      },
      dynamicLink: "https://wrench.page.link/yT3A",
      projectPermissions: {
        isOwner: false,
        isFollower: false
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      slug: "the-natural",
      title: "The Natural",
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers()
      },
      dynamicLink: "https://wrench.page.link/yT3A",
      projectPermissions: {
        isOwner: false,
        isFollower: false
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() }
    }
  },
  {
    cursor: Buffer.from("1").toString("base64"),
    node: {
      id: generateId(),
      slug: "the-natural",
      title: "The Natural",
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers()
      },
      dynamicLink: "https://wrench.page.link/yT3A",
      projectPermissions: {
        isOwner: false,
        isFollower: false
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() }
    }
  }
];

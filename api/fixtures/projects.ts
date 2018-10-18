import { take } from 'ramda'
import posts from './posts'
import generateUser from './generateUser'
import images from './images'
import followers from './followers'

export default () => [
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: '12-wefq2332r',
      slug: 'the-natural',
      title: 'BMW R100 Project',
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers(),
      },
      dynamicLink: 'https://wrench.page.link/KFko',
      projectPermissions: {
        isOwner: false,
        isFollower: false,
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() },
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: '3223fwe32',
      slug: 'the-natural',
      title: 'My Honda CB650',
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers(),
      },
      dynamicLink: 'https://wrench.page.link/KFko',
      projectPermissions: {
        isOwner: false,
        isFollower: false,
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() },
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: '23e2fwef',
      slug: 'the-natural',
      title: 'The Natural',
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers(),
      },
      dynamicLink: 'https://wrench.page.link/KFko',
      projectPermissions: {
        isOwner: false,
        isFollower: false,
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() },
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: '23e23fwef',
      slug: 'the-natural',
      title: 'The Natural',
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers(),
      },
      dynamicLink: 'https://wrench.page.link/KFko',
      projectPermissions: {
        isOwner: false,
        isFollower: false,
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() },
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: '23e23wefwefwefa',
      slug: 'the-natural',
      title: 'The Natural',
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers(),
      },
      dynamicLink: 'https://wrench.page.link/KFko',
      projectPermissions: {
        isOwner: false,
        isFollower: false,
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() },
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: '456fwefwe',
      slug: 'the-natural',
      title: 'The Natural',
      user: generateUser(),
      followersConnection: {
        totalCount: 1300,
        edges: followers(),
      },
      dynamicLink: 'https://wrench.page.link/KFko',
      projectPermissions: {
        isOwner: false,
        isFollower: false,
      },
      postsConnection: { edges: posts() },
      imagesConnection: { edges: images() },
    },
  },
]

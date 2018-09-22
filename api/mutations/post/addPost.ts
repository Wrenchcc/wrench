import generateUser from '../../fixtures/generateUser'

const debug = require('debug')('api:server')

const { APP_CDN_DOMAIN } = process.env

// TODO: Check if user data
export default async (_, { input }, ctx) => {
  debug('%O', input)

  const images = input.files.map(({ filename }) => ({
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: filename,
      uri: `${APP_CDN_DOMAIN}/${filename}`,
    },
  }))

  return {
    id: '23e234',
    type: 'image', // || video || text
    createdAt: 176347295,
    caption: input.caption,
    videos: null,
    imagesConnection: { edges: images },
    user: generateUser('1'),
    commentConnection: null,
    isAuthor: true,
    project: {
      dynamicLink: 'https://wrench.page.link/KFko',
      followersConnection: {
        totalCount: 4000,
      },
      id: '1',
      projectPermissions: {
        isFollower: false,
        isOwner: false,
      },
      slug: 'the-natural',
      title: 'BMW R100 Project',
      user: generateUser('1'),
    },
  }
}

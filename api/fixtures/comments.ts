import generateUser from './generateUser'
import generateId from './generateId'

const reply = {
  cursor: Buffer.from('1').toString('base64'),
  pageInfo: {
    hasNextPage: false,
  },
  edges: [
    {
      node: {
        id: generateId(),
        createdAt: Date.now() - 60 * 1000,
        text:
          'Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ',
        user: generateUser('2'),
      },
    },
  ],
}

export default () => [
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @pontus Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ',
      user: generateUser('3'),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text: 'Awesome choice man!',
      repliesConnection: reply,
      user: generateUser('4'),
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text: 'Awesome choice man!',
      repliesConnection: reply,
      user: generateUser('5'),
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text: 'Awesome choice man!',
      repliesConnection: reply,
      user: generateUser('6'),
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser('7'),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser('8'),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser('9'),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
  {
    cursor: Buffer.from('1').toString('base64'),
    node: {
      id: generateId(),
      createdAt: Date.now() - 60 * 1000,
      text:
        'Suspendisse vestibulum nec risus posuere luctus. @viktor Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
      user: generateUser(),
      repliesConnection: reply,
    },
  },
]

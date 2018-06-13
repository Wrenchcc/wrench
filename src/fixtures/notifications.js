import user from './user'

export default [
  {
    id: '1',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '2',
    type: 'comment',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    comment: {
      id: '1',
    },
  },
  {
    id: '3',
    type: 'reply',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    comment: {
      id: '1',
    },
  },
  {
    id: '4',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '5',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '6',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '7',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '8',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '9',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '10',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
  {
    id: '11',
    type: 'follow',
    user: user(),
    createdAt: Date.now() - 60 * 1000,
    project: {
      id: '1',
      name: 'The Natural',
    },
  },
]

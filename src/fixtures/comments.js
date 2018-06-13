import user from './user'

export default [
  {
    id: '1',
    createdAt: Date.now() - 60 * 1000,
    text:
      'Suspendisse vestibulum nec risus posuere luctus. [@pontus:1] Integer feugiat augue ut ante rhoncus,  https://wrench.cc vel pretium quam gravida. ',
    user: user(),
    replies: [
      {
        id: '1',
        createdAt: Date.now() - 60 * 1000,
        text: 'Awesome choice man!',
        user: user(),
      },
      {
        id: '2',
        createdAt: Date.now() - 60 * 1000,
        text: 'Awesome choice man! [@pontus:1]',
        user: user(),
      },
      {
        id: '3',
        createdAt: Date.now() - 60 * 1000,
        text: 'Awesome choice man!',
        user: user(),
      },
    ],
  },
  {
    id: '2',
    createdAt: Date.now() - 60 * 1000,
    text: 'Awesome choice man!',
    replies: null,
    user: user(),
  },
  {
    id: '3',
    createdAt: Date.now() - 60 * 1000,
    text: 'Awesome choice man!',
    replies: null,
    user: user(),
  },
  {
    id: '4',
    createdAt: Date.now() - 60 * 1000,
    text: 'Awesome choice man!',
    replies: null,
    user: user(),
  },
  {
    id: '5',
    createdAt: Date.now() - 60 * 1000,
    text:
      'Suspendisse vestibulum nec risus posuere luctus. [@viktor:1] Integer feugiat augue ut ante rhoncus, vel pretium quam gravida. ',
    user: user(),
    replies: [
      {
        id: '1',
        createdAt: Date.now() - 60 * 1000,
        text: 'Awesome choice man!',
        user: user(),
      },
      {
        id: '2',
        createdAt: Date.now() - 60 * 1000,
        text: 'Awesome choice man! [@pontus:1]',
        user: user(),
      },
      {
        id: '3',
        createdAt: Date.now() - 60 * 1000,
        text: 'Awesome choice man! https://motogadget.com',
        user: user(),
      },
    ],
  },
]

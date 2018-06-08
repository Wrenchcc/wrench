import posts from './posts'
import user from './user'

export default [
  {
    id: '1',
    slug: 'the-natural',
    name: 'BMW R100 Project',
    followers: 12033,
    following: true,
    coverUri: 'https://www.mobmasker.com/wp-content/uploads/2017/03/Honda-CB-750-cafe-racer-30.jpg',
    user: user(),
    owner: user('1'),
    posts,
  },
  {
    id: '2',
    slug: 'the-natural',
    name: 'My Honda CB650',
    followers: 12033,
    following: false,
    coverUri:
      'https://3.bp.blogspot.com/--Q5ou7S77GU/VIxWCnaCFOI/AAAAAAAB2MU/Iv3sN2PO_Ak/s1600/hookie-008.jpg',
    user: user(),
    owner: user('2'),
    posts,
  },
  {
    id: '3',
    slug: 'the-natural',
    name: 'The Natural',
    followers: 12033,
    following: true,
    coverUri: 'https://www.mobmasker.com/wp-content/uploads/2017/03/Honda-CB-750-cafe-racer-30.jpg',
    user: user(),
    owner: user('2'),
    posts,
  },
  {
    id: '4',
    slug: 'the-natural',
    name: 'The Natural',
    followers: 12033,
    following: false,
    coverUri:
      'https://3.bp.blogspot.com/--Q5ou7S77GU/VIxWCnaCFOI/AAAAAAAB2MU/Iv3sN2PO_Ak/s1600/hookie-008.jpg',
    user: user(),
    owner: user('3'),
    posts,
  },
  {
    id: '5',
    slug: 'the-natural',
    name: 'The Natural',
    followers: 12033,
    following: true,
    coverUri:
      'https://www.designboom.com/wp-content/uploads/2017/11/BMW-R100-custom-cafe-racer-designboom-newsletter.jpg',
    user: user(),
    owner: user('4'),
    posts,
  },
  {
    id: '6',
    slug: 'the-natural',
    name: 'The Natural',
    followers: 12033,
    following: true,
    coverUri: 'https://www.mobmasker.com/wp-content/uploads/2017/03/Honda-CB-750-cafe-racer-30.jpg',
    user: user(),
    owner: user('5'),
    posts,
  },
]

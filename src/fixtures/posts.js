import user from './user'
import comments from './comments'

export default [
  {
    id: '1',
    type: 'image', // || video || text
    createdAt: 176347295,
    caption:
      'During the build the already minimalistic lines of the BMW have been cleared. http://www.bikeexif.com',
    videos: null,
    images: [
      {
        uri:
          'https://www.mobmasker.com/wp-content/uploads/2017/03/Honda-CB-750-cafe-racer-30.jpg?234',
      },
      {
        uri:
          'https://3.bp.blogspot.com/--Q5ou7S77GU/VIxWCnaCFOI/AAAAAAAB2MU/Iv3sN2PO_Ak/s1600/hookie-008.jpg',
      },
      {
        uri:
          'https://i.pinimg.com/474x/aa/02/ee/aa02ee86840eb68d0a7eb5ee408a15fc--motorcycle-shop-bike-shop.jpg?34345',
      },
      {
        uri:
          'https://www.designboom.com/wp-content/uploads/2017/11/BMW-R100-custom-cafe-racer-designboom-newsletter.jpg?3',
      },
      {
        uri:
          'https://www.mobmasker.com/wp-content/uploads/2017/03/Honda-CB-750-cafe-racer-30.jpg?564',
      },
    ],
    user: user(),
    comments: comments.slice(0, 2),
    project: {
      id: '1',
      slug: 'the-natural',
      title: 'BMW R100 Project',
      owner: user('1'),
    },
  },
  {
    id: '2',
    type: 'text', // || video || text
    createdAt: 176347295,
    caption:
      'I used my favorite material, steel. [@pontus:1] Following I started over with a wireframe out of steel rods. It allowed me to check the shape constantly and it was much easier to adj…',
    videos: null,
    images: null,
    user: user(),
    comments: comments.slice(0, 2),
    project: {
      id: '1',
      slug: 'the-natural',
      title: 'Honda CB750 1981',
      owner: user('2'),
    },
  },
  {
    id: '4',
    type: 'image', // || video
    createdAt: 176347295,
    caption:
      "The job I've not been looking forward to. https://wrench.cc Sanding the cowl and the front fender for the GS550",
    videos: null,
    images: [
      {
        uri:
          'https://3.bp.blogspot.com/--Q5ou7S77GU/VIxWCnaCFOI/AAAAAAAB2MU/Iv3sN2PO_Ak/s1600/hookie-008.jpg',
      },
      {
        uri:
          'https://i.pinimg.com/474x/aa/02/ee/aa02ee86840eb68d0a7eb5ee408a15fc--motorcycle-shop-bike-shop.jpg',
      },
      {
        uri:
          'https://www.designboom.com/wp-content/uploads/2017/11/BMW-R100-custom-cafe-racer-designboom-newsletter.jpg?3',
      },
    ],
    user: user(),
    comments: comments.slice(0, 2),
    project: {
      id: '3',
      slug: 'the-natural',
      title: 'R100 Scrambler',
      owner: user('3'),
    },
  },
  {
    id: '5',
    type: 'image', // || video
    createdAt: 176347295,
    caption:
      "The job I've not been looking forward to. Sanding the cowl and the front fender for the GS550",
    videos: null,
    images: [
      {
        uri:
          'https://www.designboom.com/wp-content/uploads/2017/11/BMW-R100-custom-cafe-racer-designboom-newsletter.jpg',
      },
    ],
    user: user(),
    comments: comments.slice(0, 2),
    project: {
      id: '3',
      slug: 'the-natural',
      title: 'The Natural CB750',
      owner: user('4'),
    },
  },
  {
    id: '6',
    type: 'image', // || video
    createdAt: 176347295,
    caption:
      "The job I've not been looking forward to. Sanding the cowl and the front fender for the GS550",
    videos: null,
    images: [
      {
        uri:
          'https://www.designboom.com/wp-content/uploads/2017/11/BMW-R100-custom-cafe-racer-designboom-newsletter.jpg',
      },
    ],
    user: user(),
    comments: comments.slice(0, 2),
    project: {
      id: '3',
      slug: 'the-natural',
      title: 'BMW R100 Project',
      owner: user('5'),
    },
  },
  {
    id: '7',
    type: 'text', // || video
    createdAt: 176347295,
    caption:
      "The job I've not been looking forward to. Sanding the cowl and the front fender for the GS550",
    videos: null,
    images: null,
    user: user(),
    comments: comments.slice(0, 2),
    project: {
      id: '3',
      slug: 'the-natural',
      title: 'Scrambler',
      owner: user('6'),
    },
  },
]

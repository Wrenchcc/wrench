import { GraphQLClient } from 'graphql-request'

const { API_ENDPOINT } = process.env

const client = new GraphQLClient(API_ENDPOINT, {
  headers: {
    Authorization: 'Bearer my-jwt-token',
  },
})

const mutation = `mutation {
  addArticle(input: $input) {
    id
  }
}`

const variables = {
  input: {
    files: [
      'https://kickstart.bikeexif.com/wp-content/uploads/2019/11/honda-cbx-750-f-cafe-racer.jpg',
    ],
    publisher: 'bikeexif',
    categories: ['cb750'],
    author: 'Wesley Reyneke',
    createdAt: '2019-11-05',
    description:
      'The annals of motorcycling history are filled with ‘tweeners’—motorcycles that improved upon outgoing models, but eventually fizzled out to make way for the next generation. Just like the Honda CBX 750 F. The CBX 750 F was an update on the beloved (and indeed iconic) CB750, but it wasn’t nearly as popular, and wasn’t really…',
    title: 'Hot stuff: A Honda CBX 750 built by a firefighter',
    url: 'https://www.bikeexif.com/honda-cbx-750-f-cafe-racer',
  },
}

client.request(mutation, variables).then(data => console.log(data))

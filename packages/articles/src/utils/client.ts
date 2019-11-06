import { GraphQLClient } from 'graphql-request'

const { API_ENDPOINT } = process.env

const client = new GraphQLClient(API_ENDPOINT, {
  headers: {
    Authorization: 'Bearer my-jwt-token',
  },
})

const query = `{
  Movie(title: "Inception") {
    releaseDate
    actors {
      name
    }
  }
}`

client.request(query).then(data => console.log(data))

import * as fetch from 'node-fetch'

const { API_ENDPOINT } = process.env

export default async function request(input) {
  const mutation = JSON.stringify({
    query: `
      mutation($input: ArticleInput!) {
        addArticle(input: $input) {
          id
        }
      }
    `,
    variables: {
      input,
    },
  })

  try {
    await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: mutation,
    })
  } catch (err) {
    console.log(err)
  }
}

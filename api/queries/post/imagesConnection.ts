import images from 'api/fixtures/images'

export default async (_, __, ctx) => {
  try {
    return {
      edges: images,
    }
  } catch (err) {
    console.log(err)
  }
}

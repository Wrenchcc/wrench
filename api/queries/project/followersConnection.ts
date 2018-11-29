export default async (_, __, ctx) => {
  try {
    return {
      totalCount: 100,
    }
  } catch (err) {
    console.log(err)
  }
}

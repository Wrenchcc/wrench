export default async (_, __, ctx) => {
  try {
    return {
      isFollower: false,
    }
  } catch (err) {
    console.log(err)
  }
}

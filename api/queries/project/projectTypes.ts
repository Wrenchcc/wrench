export default async (_, __, ctx) => {
  try {
    return ctx.db.ProjectType.find()
  } catch (err) {
    console.log(err)
  }
}

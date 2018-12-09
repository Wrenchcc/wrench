// TODO: User dataloader
export default async ({ projectId }, args, ctx) => {
  try {
    return ctx.db.Project.findOne(projectId)
  } catch (err) {
    console.log(err)
  }
}

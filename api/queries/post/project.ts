// TODO: Use dataloader
export default async ({ projectId }, args, ctx) => ctx.db.Project.findOne(projectId)

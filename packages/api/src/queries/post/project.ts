// TODO: Use dataloader
export default async ({ projectId }, _, ctx) => ctx.db.Project.findOne(projectId)

export default async ({ projectTypeId }, _, ctx) => ctx.db.ProjectType.findOne(projectTypeId)

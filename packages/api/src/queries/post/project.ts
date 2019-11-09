export default async ({ projectId }, _, ctx) => {
  return ctx.loaders.project.load(projectId)
}

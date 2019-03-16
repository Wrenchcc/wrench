export default async ({ id }, __, ctx) => ctx.services.facebook.getAvatarById(id)

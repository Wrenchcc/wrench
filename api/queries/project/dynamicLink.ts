import { getDynamicLink } from 'api/models/DynamicLink'

export default async ({ id }, args, ctx) => getDynamicLink(id)

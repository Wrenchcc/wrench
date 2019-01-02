import { getDynamicLink } from 'api/models/DynamicLink'

export default async ({ id }, args, ctx) => {
  try {
    return getDynamicLink(id)
  } catch (err) {
    console.log(err)
  }
}

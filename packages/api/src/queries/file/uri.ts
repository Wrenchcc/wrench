import { transformFileUrl } from '../../utils/transformFileUrl'

export default async ({ filename }) => {
  return transformFileUrl(filename)
}

import slugify from 'slugify'

export default function generateSlug(slug) {
  return slugify(slug.toLowerCase())
}

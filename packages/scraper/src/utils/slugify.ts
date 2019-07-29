import s from 'slugify'

export default function slugify(slug) {
  return s(slug, { lower: true })
}

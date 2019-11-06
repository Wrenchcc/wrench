import s from '@sindresorhus/slugify'

export default function slugify(slug, separator = '.') {
  return s(slug, { separator })
}

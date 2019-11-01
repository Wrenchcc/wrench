import s from '@sindresorhus/slugify'

export default function slugify(slug) {
  return s(slug, {
    separator: '.',
  })
}

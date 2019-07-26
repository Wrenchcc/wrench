const PATTERN = /(?<=<img[^<]+?src=\")[^\"]+/g

export default function extractImageSources(text) {
  return text.match(PATTERN)
}

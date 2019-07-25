const PATTERN = /[^"\'=\s]+\.(jpe?g|png|gif)/g

export default function extractImageSources(text) {
  const images = text.match(PATTERN)
  console.log(images.sort())
}

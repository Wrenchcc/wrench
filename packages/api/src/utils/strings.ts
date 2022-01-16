export const capitalizeWords = (word) => {
  const words = word.split(' ')

  return words
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1)
    })
    .join(' ')
}

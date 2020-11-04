import client from '../client'

export const translateText = async (text, target) => {
  try {
    const [translation] = await client.translate(text, target)

    return translation
  } catch (err) {
    console.log(err)
  }
}

export const detect = async (text) => {
  try {
    const [detections] = await client.detect(text)

    console.log(detections)

    return detections
  } catch (err) {
    console.log(err)
  }
}

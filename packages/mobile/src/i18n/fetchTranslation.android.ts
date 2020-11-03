import { readFileAssets } from 'react-native-fs'

const fetchTranslation = async (language) => {
  const path = `translations/${language}.json`
  const contents = await readFileAssets(path, 'utf8')
  return JSON.parse(contents)
}

export default fetchTranslation

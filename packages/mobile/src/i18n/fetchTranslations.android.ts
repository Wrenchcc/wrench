import fs from 'react-native-fs'

const fetchTranslation = async (locale) => {
  const path = `translations/${locale}.json`
  const contents = await fs.readFileAssets(path, 'utf8')
  return JSON.parse(contents)
}

export default fetchTranslation

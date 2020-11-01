import fs from 'react-native-fs'

const fetchTranslation = async (locale) => {
  const path = `${fs.MainBundlePath}/${locale}.json`
  const contents = await fs.readFile(path, 'utf8')
  return JSON.parse(contents)
}

export default fetchTranslation

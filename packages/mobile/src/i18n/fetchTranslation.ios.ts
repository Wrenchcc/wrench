import { readFile, MainBundlePath } from 'react-native-fs'

const fetchTranslation = async (language) => {
  const path = `${MainBundlePath}/${language}.json`
  const contents = await readFile(path, 'utf8')
  return JSON.parse(contents)
}

export default fetchTranslation

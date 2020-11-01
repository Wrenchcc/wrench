import fs from 'react-native-fs'

const fetchTranslation = async (language, namespace) => {
  const path = `${fs.MainBundlePath}/${language}/${namespace}.json`
  const contents = await fs.readFile(path, 'utf8')
  return JSON.parse(contents)
}

export default fetchTranslation

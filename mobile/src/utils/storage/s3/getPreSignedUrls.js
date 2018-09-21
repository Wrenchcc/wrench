import Config from 'react-native-config'

export default async files => {
  const result = await fetch(Config.WRENCH_JUPITER_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(files),
  })

  return result.json()
}

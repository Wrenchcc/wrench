export const getLanguagePartFromCode = (code) => {
  if (!code || code.indexOf('-') < 0) {
    return code
  }

  const p = code.split('-')
  return p[0]
}

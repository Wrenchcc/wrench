import React from 'react'
import { Text } from 'react-native'
import TextExtraction from './TextExtraction'

export const PATTERNS = {
  email: /\S+@\S+\.\S+/,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  url: /((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/))?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,15}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,
}

function ParsedText({ parse, children, childrenProps, ...restProps }) {
  const getPatterns = () =>
    parse.map((option) => {
      const { type, ...patternOption } = option

      if (type) {
        if (!PATTERNS[type]) {
          throw new Error(`${option.type} is not a supported type`)
        }
        patternOption.pattern = PATTERNS[type]
      }

      return patternOption
    })

  const getParsedText = () => {
    if (!parse) {
      return children
    }

    if (typeof children !== 'string') {
      return children
    }

    const textExtraction = new TextExtraction(children, getPatterns())

    return textExtraction
      .parse()
      .map((props, index) => <Text key={`text-${index}`} {...childrenProps} {...props} />)
  }

  return <Text {...restProps}>{getParsedText()}</Text>
}

export default ParsedText

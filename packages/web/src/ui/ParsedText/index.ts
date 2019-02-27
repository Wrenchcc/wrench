import React, { PureComponent } from 'react'
import TextExtraction from './extraction'

export const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*[-a-zA-Z0-9@:%_\+~#?&\/=])*/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  email: /\S+@\S+\.\S+/,
}

export default class ParsedText extends PureComponent {
  static displayName = 'ParsedText'

  static defaultProps = {
    parse: null,
    childrenProps: {},
  }

  getPatterns() {
    return this.props.parse.map(option => {
      const { type, ...patternOption } = option
      if (type) {
        if (!PATTERNS[type]) {
          throw new Error(`${option.type} is not a supported type`)
        }
        patternOption.pattern = PATTERNS[type]
      }

      return patternOption
    })
  }

  getParsedText() {
    const textExtraction = new TextExtraction(this.props.children, this.getPatterns())

    return textExtraction
      .parse()
      .map(({ onPress, ...props }, index) => (
        <span
          key={`parsedText-${index}`}
          {...this.props.childrenProps}
          {...props}
          onClick={onPress}
        />
      ))
  }

  render() {
    const { parse, childrenProps, className } = this.props
    return <p className={className}>{this.getParsedText()}</p>
  }
}

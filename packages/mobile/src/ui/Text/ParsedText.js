import React, { PureComponent } from 'react'
import { Text } from 'react-native'
import PropTypes from 'prop-types'
import TextExtraction from './TextExtraction'

export const PATTERNS = {
  url: /(https?:\/\/|www\.)[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/=]*[-a-zA-Z0-9@:%_\+~#?&\/=])*/i,
  phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,7}/,
  email: /\S+@\S+\.\S+/,
}

export default class ParsedText extends PureComponent {
  static displayName = 'ParsedText'

  static propTypes = {
    // parse: PropTypes.arrayOf(PropTypes.oneOfType([defaultParseShape, customParseShape])),
    // childrenProps: PropTypes.shape(Text.propTypes),
  }

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
    if (!this.props.parse) {
      return this.props.children
    }

    if (typeof this.props.children !== 'string') {
      return this.props.children
    }

    const textExtraction = new TextExtraction(this.props.children, this.getPatterns())

    return textExtraction
      .parse()
      .map((props, index) => (
        <Text key={`text-${index}`} {...this.props.childrenProps} {...props} />
      ))
  }

  render() {
    const { parse, childrenProps, ...remainder } = this.props

    return <Text {...remainder}>{this.getParsedText()}</Text>
  }
}

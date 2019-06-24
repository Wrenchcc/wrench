export default class TextExtraction {
  constructor(text, patterns) {
    this.text = text
    this.patterns = patterns || []
  }

  public parse() {
    let parsedTexts = [{ children: this.text }]
    this.patterns.forEach(pattern => {
      const newParts = []

      parsedTexts.forEach(parsedText => {
        // Only allow for now one parsing
        if (parsedText.matched) {
          newParts.push(parsedText)

          return
        }

        const parts = []
        let textLeft = parsedText.children
        let indexOfMatchedString = 0

        while (textLeft) {
          const matches = pattern.pattern.exec(textLeft)

          if (!matches) {
            break
          }

          const previousText = textLeft.substr(0, matches.index)
          indexOfMatchedString += matches.index

          parts.push({ children: previousText })

          parts.push(this.getMatchedPart(pattern, matches[0], matches, indexOfMatchedString))

          textLeft = textLeft.substr(matches.index + matches[0].length)
          indexOfMatchedString += matches[0].length
        }

        parts.push({ children: textLeft })

        newParts.push(...parts)
      })

      parsedTexts = newParts
    })

    // Remove matched key.
    parsedTexts.forEach(parsedText => delete parsedText.matched)

    return parsedTexts.filter(t => !!t.children)
  }

  private getMatchedPart(matchedPattern, text, matches, index) {
    const props = {}

    Object.keys(matchedPattern).forEach(key => {
      if (key === 'pattern' || key === 'renderText') {
        return
      }

      if (typeof matchedPattern[key] === 'function') {
        props[key] = () => matchedPattern[key](text, index)
      } else {
        props[key] = matchedPattern[key]
      }
    })

    let children = text
    if (matchedPattern.renderText && typeof matchedPattern.renderText === 'function') {
      children = matchedPattern.renderText(text, matches)
    }

    return {
      ...props,
      children,
      matched: true,
    }
  }
}

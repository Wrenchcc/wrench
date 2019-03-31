import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Spring } from 'react-spring/renderprops'
import withTranslation from 'i18n/withTranslation'
import { logError } from 'utils/sentry'
import Text from 'ui/Text'
import { Base } from './styles'

const FROM_HEIGHT = 0
const TO_HEIGHT = 40

class ErrorBoundary extends PureComponent {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  }

  state = {
    hasError: false,
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    }
  }

  componentDidCatch(error) {
    logError(error)
  }

  render() {
    const { t, children } = this.props
    return (
      <>
        <Spring
          from={{ height: FROM_HEIGHT }}
          to={{ height: this.state.hasError ? TO_HEIGHT : FROM_HEIGHT }}
          native
        >
          {({ height }) => (
            <Base height={height}>
              <Text color="white" medium center fontSize={15}>
                {t('ErrorBoundary:networkError')}
              </Text>
            </Base>
          )}
        </Spring>
        {children}
      </>
    )
  }
}

export default withTranslation('ErrorBoundary')(ErrorBoundary)

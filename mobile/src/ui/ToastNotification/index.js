import React from 'react'
import { Spring } from 'react-spring'
import { withNamespaces } from 'react-i18next'
import { Subscribe } from 'unstated'
import { ToastNotificationContainer } from 'store'
import { Text } from 'ui'
import { Base } from './styles'

const FROM_HEIGHT = 0
const TO_HEIGHT = 40

function ToastNotification() {
  return (
    <Subscribe to={[ToastNotificationContainer]}>
      {({ state: { message, type } }) => (
        <Spring from={{ height: FROM_HEIGHT }} to={{ height: message ? TO_HEIGHT : FROM_HEIGHT }}>
          {({ height }) => (
            <Base height={height} type={type}>
              <Text color="white" medium center fontSize={15}>
                {message}
              </Text>
            </Base>
          )}
        </Spring>
      )}
    </Subscribe>
  )
}

export default withNamespaces('ToastNotification')(ToastNotification)

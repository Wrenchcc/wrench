// @ts-nocheck
import React from 'react'
import { createPortal } from 'react-dom'
import { isBrowser } from 'utils/platform'

/**
 * Modal Root
 *
 * Renders modals using react portal.
 */

export function ModalRoot({ modals, container: Container = React.Fragment }) {
  if (isBrowser) {
    return createPortal(
      <Container>
        {Object.keys(modals).map(key => {
          const Component = modals[key]
          return <Component key={key} />
        })}
      </Container>,
      document.body
    )
  }

  return null
}

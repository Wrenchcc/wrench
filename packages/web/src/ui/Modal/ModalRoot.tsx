// @ts-nocheck
import React, { memo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ModalType } from './ModalContext'
import { isBrowser } from '../../utils/platform'

/**
 * Modal Root Props
 */
interface ModalRootProps {
  /**
   * Map of modal instances associated by unique ids
   */
  modals: Record<string, ModalType>

  /**
   * Container component for modals
   *
   * Modals will be rendered as children of this component. React.Fragment is
   * used by defualt, specifying a different component can change the way modals
   * are rendered across the whole application.
   */
  container?: React.ComponentType<any>
}

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

import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { ProgressBar } from 'ui'
import { Base } from './styles'

const Footer = memo(function Footer({ progress }) {
  return (
    <Base>
      <ProgressBar progress={progress} />
    </Base>
  )
})

Footer.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default Footer

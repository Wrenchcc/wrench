import React from 'react'
import PropTypes from 'prop-types'
import { ProgressBar } from 'ui'
import { Base } from './styles'

const Footer = ({ progress }) => (
  <Base>
    <ProgressBar progress={progress} />
  </Base>
)

Footer.propTypes = {
  progress: PropTypes.number.isRequired,
}

export default Footer

import styled from 'styled-components'
import UiImage from 'ui/Image'

export const HEIGHT = 220

export const Base = styled.View`
  height: ${HEIGHT};
  width: 100%;
  overflow: hidden;
  position: relative;
`

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
`

export const Cell = styled.View`
  width: ${props => props.size * 100}%;
`

export const Image = styled(UiImage)`
  margin-right: ${props => (props.borderRight && 1.5) || 0};
  margin-left: ${props => (props.borderLeft && 1.5) || 0};
  margin-top: ${props => (props.borderTop && 3) || 0};
`

export const Transform = styled.View`
  width: 100%;
  ${props => props.enabled && 'transform: rotate(-25deg) scale(1.7)'};
`

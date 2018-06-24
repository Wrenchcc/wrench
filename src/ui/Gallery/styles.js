import styled from 'styled-components'
import UiImage from 'ui/Image'

export const HEIGHT = 180

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
  width: ${({ size }) => size * 100}%;
`

export const Image = styled(UiImage)`
  margin-right: ${({ borderRight }) => (borderRight && 1.5) || 0};
  margin-left: ${({ borderLeft }) => (borderLeft && 1.5) || 0};
  margin-top: ${({ borderTop }) => (borderTop && 3) || 0};
`

export const Transform = styled.View`
  width: 100%;
  ${({ enabled }) => enabled && 'transform: rotate(-25deg) scale(1.7)'};
`

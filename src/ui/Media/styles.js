import styled from 'styled-components'
import UiCaption from './Caption'

export const GUTTER = 20

export const Base = styled.View`
  flex: 1;
`
export const Caption = styled(UiCaption)`
  margin-bottom: ${GUTTER};
`

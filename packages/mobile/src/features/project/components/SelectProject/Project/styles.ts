import styled from 'styled-components'
import UiTouchable from 'ui/Touchable'
import UiImage from 'ui/Image'

export const Base = styled(UiTouchable)`
  height: 56px;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom-color: ${(props) => props.theme.colors.divider};
`

export const Cover = styled(UiImage)`
  width: 40px;
  height: 40px;
`

export const Middle = styled.View`
  flex-direction: row;
  flex: 1;
`

export const Content = styled.View`
  flex: 1;
  margin-left: ${(props) => (props.noImage ? 0 : 10)}px;
  margin-right: 20px;
`

export const Icon = styled.Image`
  align-self: center;
`

import styled from 'styled-components'
import { Touchable } from 'ui'

export const Base = styled.View`
  padding-bottom: ${(props) => (props.paddingBottom ? props.paddingBottom : 50)}px;
`

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
  margin-right: 60px;
`

export const Bottom = styled.View`
  flex-direction: row;
`

export const Content = styled.View`
  padding-top: 18px;
`

export const Headline = styled.View`
  padding-right: 10px;
  margin-bottom: 5px;
`

export const Spacer = styled.View`
  margin-top: 20px;
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Collection = styled(Touchable)`
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${(props) => props.theme.colors.divider};
`

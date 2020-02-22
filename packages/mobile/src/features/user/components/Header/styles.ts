import styled from 'styled-components'

export const Base = styled.View`
  padding-bottom: 45px;
  padding-left: ${props => (props.spacingHorizontal ? 20 : 0)}px;
  padding-right: ${props => (props.spacingHorizontal ? 20 : 0)}px;
`

export const Inner = styled.View`
  flex-direction: row;
  justify-content: space-between;
`

export const Username = styled.View`
  flex: 1;
  padding-right: 10px;
`

export const Info = styled.View`
  padding-top: 20px;
`

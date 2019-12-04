import styled from 'styled-components'

export const Base = styled.View`
  padding-bottom: ${props => (props.paddingBottom ? props.paddingBottom : 50)};
`

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
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

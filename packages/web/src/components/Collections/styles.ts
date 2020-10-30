import styled from 'styled-components'
import UIText from 'ui/Text'
import UIImage from 'ui/Image'

export const Base = styled.div``

export const Inner = styled.div`
  display: flex;
  margin-left: -20px;
  margin-top: 20px;
`

export const Item = styled.div`
  margin-left: 20px;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`

export const Name = styled(UIText)`
  margin-top: 8px;
`

export const Cover = styled(UIImage)`
  border: 2px solid ${(props) => (props.selected ? props.theme.colors.inverse : 'transparent')};
  box-sizing: border-box;
`

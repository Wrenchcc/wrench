import styled from 'styled-components'
import UIText from 'ui/Text'
import UIImage from 'ui/Image'
import { DEVICE } from 'ui/constants'

export const Base = styled.div`
  @media ${DEVICE.TABLET} {
    margin-top: 30px;
  }
`

export const Inner = styled.div`
  margin-left: -20px;
  margin-top: 20px;
  column-count: 3;
  column-gap: 20px;
  max-width: 220px;

  @media ${DEVICE.TABLET} {
    margin-left: -20px;
    column-count: 0;
    column-gap: 0;
    max-width: 100%;
    display: flex;
    flex-direction: row;
    overflow: auto;
  }
`

export const Item = styled.div`
  margin-left: 20px;
  margin-bottom: 20px;
  width: 60px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  column-break-inside: avoid;

  @media ${DEVICE.TABLET} {
    overflow: visible;
  }
`

export const Name = styled(UIText)`
  margin-top: 8px;
`

export const Cover = styled(UIImage)`
  border: 2px solid ${(props) => (props.selected ? props.theme.colors.inverse : 'transparent')};
  box-sizing: border-box;
`

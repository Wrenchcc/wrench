// @ts-nocheck
import styled from 'styled-components'

export const Base = styled.div`
  cursor: pointer;
  position: relative;
  width: 19px;
  height: 19px;

  &:before {
    display: ${props => (props.unread ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: -5px;
    right: -4px;
    border-radius: 8px;
    width: 8px;
    height: 8px;
    border: solid 3px ${props => props.theme.colors.default};
    background-color: #f68a56;
  }
`
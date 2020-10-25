// @ts-nocheck
import styled from 'styled-components'
import { COLORS } from 'ui/constants'

export const Base = styled.div`
  width: 100%;
  margin-bottom: 50px;
  overflow: auto;
  display: flex;
  flex-direction: row;
  background: ${props => props.theme.colors.default};
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  height: 50px;
  border: 1px solid ${(props) => (props.selected ? props.theme.colors.inverse : props.theme.colors.divider)};
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  padding-left: 35px;
  padding-right: 35px;
  white-space: nowrap;
  cursor: pointer;
`

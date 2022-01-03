// @ts-nocheck
import styled from 'styled-components'
import { SearchIcon as UISearchIcon } from '@wrench/ui'

export const Base = styled.div`
  position: relative;
  width: ${(props) => (props.active ? '375px' : '290px')};
  transition: 0.15s ease-in-out;
  will-change: transform;
`

export const Field = styled.input`
  background: ${(props) =>
    props.theme.isDark ? props.theme.colors.placeholder : 'rgba(168, 168, 173, 0.2)'};
  border: none;
  height: 40px;
  outline: none;
  padding: 0 40px;
  color: rgb(109, 111, 118);
  font-size: 16px;
  width: 100%;
`

export const SearchIcon = styled(UISearchIcon)`
  position: absolute;
  left: 15px;
  top: 13px;
`

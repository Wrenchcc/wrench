// @ts-nocheck
import styled from 'styled-components'

export const Base = styled.div`
  align-items: center;
  width: 335px;
  padding: 0 20px;
  padding-top: ${props => (props.padding ? 40 : 0)}px;
  padding-bottom: ${props => (props.padding ? 40 : 0)}px;
  box-sizing: border-box;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 0.11);
  background-color: ${props => props.theme.isDark ? props.theme.colors.placeholder : props.theme.colors.white};
  position: absolute;
  right: 0;
  top: 50px;
  z-index: 100;
  display: flex;
  flex-direction: column;
  max-height: 340px;
  overflow: hidden;
  overflow: auto;
`

export const Empty = styled.div`
  padding: 40px 0px;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`

import styled from 'styled-components'

export const Base = styled.div`
  margin-top: 30px;
`

export const FacebookButton = styled.button`
  background: ${props => props.theme.colors.facebook};
  height: 50px;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  border: none;
  margin-top: 40px;
  margin-bottom: 10px;
`

export const AppleButton = styled.button`
  background: black;
  border: solid 1px ${props => (props.theme.isDark ? props.theme.colors.neutral : 'transparent')};
  height: 50px;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  margin-bottom: 10px;
`

export const GoogleButton = styled.button`
  background: white;
  border: solid 1px #a8a8ad;
  height: 50px;
  width: 100%;
  color: white;
  font-size: 16px;
  font-weight: 500;
  outline: none;
  color: black;
`

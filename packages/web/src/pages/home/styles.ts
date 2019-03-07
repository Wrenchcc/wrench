import styled from 'styled-components'
import UiButton from '../../ui/Button'
import UiText from '../../ui/Text'

export const Hero = styled.section`
  width: 100%;
  height: calc(100vh - 98px);
  background: black;
  overflow: hidden;
  position: relative;

  &:before {
    position: absolute;
    content: '';
    z-index: 1;
    width: 100%;
    height: 100%;
    background: rgba(000, 000, 000, 0.5);
  }
`

export const Signup = styled(UiButton)`
  background: white;
  padding: 0 50px;
  height: 50px;
  border: none;
  margin-top: 45px;
`

export const Description = styled(UiText)`
  margin-top: 10px;
`

export const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`

export const Inner = styled.div`
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: ${props => props.alignItems || 'flex-start'};
  justify-content: ${props => props.justifyContent || 'center'};
  flex-direction: ${props => props.direction || 'column'};
  height: 100%;
  position: relative;
  z-index: 10;
`

export const Projects = styled.section`
  max-width: 1060px;
  width: 100%;
  margin: 0 auto;
  padding-top: 80px;
`

export const AppPromo = styled.section`
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  background: black;
  height: 600px;
  margin-top: 90px;
  display: flex;
  align-items: center;
  flex-direction: row;
`

export const ExploreLink = styled.a`
  cursor: pointer;
  border-bottom: 1.5px solid black;
  font-weight: 500;
`

export const AppScreens = styled.img`
  width: 482px;
  height: 524px;
  align-self: flex-end;
`

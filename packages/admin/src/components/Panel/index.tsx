// @ts-nocheck
import React from 'react'
import { NavLink } from 'react-router-dom'
import useLocalStorage from '../../utils/useLocalStorage'
import styled from 'styled-components'

export const Base = styled.div`
  width: 270px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: #e6e7e9;
  z-index: 20;
`

export const Nav = styled.nav`
  padding-top: 70px;
  padding-bottom: 70px;
  margin-top: 50px;
  box-sizing: border-box;
  width: 270px;
  height: 100%;
  overflow: auto;
  position: relative;
`

export const SignOut = styled.button`
  background: none;
  border: 0;
  color: #6d6f76;
  font-size: 15px;
  margin-left: 30px;
`

export const Section = styled.div`
  color: #6d6f76;
  margin-left: 30px;
  font-size: 15px;
  margin-bottom: 20px;
`

export const Link = styled.li`
  margin-bottom: 20px;
  padding-left: 65px;
  line-height: 19px;
`

export const Username = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
`

export const Row = styled.div`
  margin-bottom: 50px;
`

export const Icon = styled.img`
  position: absolute;
  left: 30px;
`

function Panel({ setAuthenticated }) {
  const [, , removeAccessToken] = useLocalStorage('access_token')
  const [, , removeRefreshToken] = useLocalStorage('refresh_token')

  const signOut = () => {
    removeAccessToken()
    removeRefreshToken()
    setAuthenticated(false)
  }

  return (
    <Base>
      <Nav>
        <Row>
          <Section>Operate</Section>

          <ul>
            <Link>
              <Icon src={require('./dashboard.svg')} />
              <NavLink
                exact
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/"
              >
                Dashboard
              </NavLink>
            </Link>
            <Link>
              <Icon src={require('./posts.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/posts"
              >
                Posts
              </NavLink>
            </Link>
            <Link>
              <Icon src={require('./projects.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/projects"
              >
                Projects
              </NavLink>
            </Link>
            <Link>
              <Icon src={require('./users.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/users"
              >
                Users
              </NavLink>
            </Link>
            <Link>
              <Icon src={require('./comments.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/comments"
              >
                Comments
              </NavLink>
            </Link>
            <Link>
              <Icon src={require('./reviews.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/reviews"
              >
                Reviews
              </NavLink>
            </Link>
          </ul>
        </Row>

        <Row>
          <Section>Marketing</Section>

          <ul>
            <Link>
              <Icon src={require('./news.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/news"
              >
                News
              </NavLink>
            </Link>

            <Link>
              <Icon src={require('./push-notifications.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/push-notifications"
              >
                Push notifications
              </NavLink>
            </Link>
            
            <Link>
              <Icon src={require('./google.svg')} />
              <a href="https://analytics.google.com/analytics/web/#/p178012703/reports/home">
                Google Analytics
              </a>
            </Link>

            <Link>
              <Icon src={require('./appradar.svg')} />
              <a href="https://web.appradar.com/projects">AppRadar</a>
            </Link>
          </ul>
        </Row>

        <Row>
          <Section>Developer</Section>
          <ul>
            <Link>
              <Icon src={require('./deploy.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/deploy"
              >
                Deploy
              </NavLink>
            </Link>
            <Link>
              <Icon src={require('./sentry.svg')} />
              <a href="https://sentry.io/organizations/wrench/issues/?project=1354419">Sentry</a>
            </Link>
            <Link>
              <Icon src={require('./firebase.svg')} />
              <a href="https://console.firebase.google.com/u/0/project/wrench-app/overview">
                Firebase
              </a>
            </Link>
            <Link>
              <Icon src={require('./appstore.svg')} />
              <a href="https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app/1450213123">
                App Store Connect
              </a>
            </Link>
            <Link>
              <Icon src={require('./google-play.svg')} />
              <a href="https://play.google.com/apps/publish/?account=7089963842901266485#AppDashboardPlace:p=com.wrench&appid=4976310944626164906">
                Google Play
              </a>
            </Link>
            <Link>
              <Icon src={require('./aws.svg')} />
              <a href="https://eu-west-1.console.aws.amazon.com/console/home?region=eu-west-1">
                AWS
              </a>
            </Link>
          </ul>
        </Row>

        <SignOut onClick={signOut}>Log out</SignOut>
      </Nav>
    </Base>
  )
}

export default Panel

// @ts-nocheck
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCurrentUserQuery } from '@wrench/common'
import useLocalStorage from '../../utils/useLocalStorage'
import styled from 'styled-components'
import Avatar from '../../components/Avatar'

export const Base = styled.div`
  width: 270px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: #e6e7e9;
  padding-top: 70px;
`

export const Nav = styled.nav`
  width: 270px;
  height: 100vh;
  overflow: auto;
  position: relative;
  background-color: red;
`

export const Top = styled.div`
  margin-left: 30px;
  margin-bottom: 45px;
  display: flex;
  flex-direction: column;
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
  const { data } = useCurrentUserQuery()

  const signOut = () => {
    removeAccessToken()
    removeRefreshToken()
    setAuthenticated(false)
  }

  return (
    <Base>
      <Nav>
        {/* <Top>
        <Avatar src={data?.user?.avatarUrl} />
        <Username>{data?.user?.fullName}</Username>
      </Top> */}

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
              <Icon src={require('./newsletter.svg')} />
              <NavLink
                activeStyle={{
                  fontWeight: '500',
                  color: 'black',
                }}
                to="/newsletter"
              >
                Newsletter
              </NavLink>
            </Link>

            <Link>
              <a href="https://analytics.google.com/analytics/web/#/p178012703/reports/home">
                Google Analytics
              </a>
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
              <a href="https://analytics.google.com/analytics/web/#/p178012703/reports/home">
                Sentry
              </a>
            </Link>
            <Link>
              <Icon src={require('./sentry.svg')} />
              <a href="https://analytics.google.com/analytics/web/#/p178012703/reports/home">
                Crashlytics
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

// @ts-nocheck
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCurrentUserQuery } from '@wrench/common'
import useLocalStorage from '../../utils/useLocalStorage'
import styled from 'styled-components'
import Avatar from '../../components/Avatar'

export const Base = styled.nav`
  width: 270px;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  background: #e6e7e9;
  padding-top: 120px;
`

export const Top = styled.div`
  margin-left: 30px;
  margin-bottom: 45px;
  display: flex;
  flex-direction: column;
`

export const SignOut = styled.button`
  position: absolute;
  bottom: 140px;
  left: 30px;
  background: none;
  border: 0;
  color: #6d6f76;
  font-size: 15px;
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
      <Top>
        <Avatar src={data?.user?.avatarUrl} />
        <Username>{data?.user?.fullName}</Username>
      </Top>

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
        </ul>
      </Row>

      <SignOut onClick={signOut}>Log out</SignOut>
    </Base>
  )
}

export default Panel

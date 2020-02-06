// @ts-nocheck
import React from 'react'
import { NavLink } from 'react-router-dom'
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

export const Section = styled.div`
  color: #6d6f76;
  margin-left: 30px;
  font-size: 15px;
  margin-bottom: 20px;
`

export const Link = styled(NavLink)`
  margin-bottom: 15px;
  display: inline-block;
  padding-left: 30px;
`

export const Username = styled.span`
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
`

export const Row = styled.div`
  margin-bottom: 50px;
`

function Panel() {
  return (
    <Base>
      <Top>
        <Avatar src="https://edge-files.wrench.cc/avatar/97b416d0-2a8d-4996-9e6c-8b70e19313d1.jpg?w=30&h=30?dpr=1" />
        <Username>Pontus Abrahamsson</Username>
      </Top>

      <Row>
        <Section>Operate</Section>

        <ul>
          <li>
            <Link
              exact
              activeStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              to="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              activeStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              to="/posts"
            >
              Posts
            </Link>
          </li>
          <li>
            <Link
              activeStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              to="/projects"
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              activeStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              to="/users"
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              activeStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              to="/comments"
            >
              Comments
            </Link>
          </li>
        </ul>
      </Row>

      <Row>
        <Section>Marketing</Section>

        <ul>
          <li>
            <Link
              activeStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              to="/push-notifications"
            >
              Push notifications
            </Link>
          </li>
          <li>
            <Link
              activeStyle={{
                fontWeight: '500',
                color: 'black',
              }}
              to="/newsletter"
            >
              Newsletter
            </Link>
          </li>
        </ul>
      </Row>

      {/* <Link>Log out</Link> */}
    </Base>
  )
}

export default Panel

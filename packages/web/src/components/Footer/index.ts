import React from 'react'
import Link from 'next/link'
import { Text } from '../../ui'
import { Base, Inner, Bottom, Navigation, Column, NavItem } from './styles'

function Footer() {
  return (
    <Base>
      <Inner>
        <Navigation>
          <Column>
            <Text medium>Wrench</Text>
            <ul>
              <NavItem>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/press">
                  <a>Press</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>Help</Text>
            <ul>
              <NavItem>
                <a href="mailto:support@wrench.cc">Mail Support</a>
              </NavItem>
              <NavItem>
                <a href="mailto:feedback@wrench.cc">Feedback</a>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>Legal</Text>
            <ul>
              <NavItem>
                <Link href="/terms">
                  <a>Terms</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/policy">
                  <a>Policy</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>Social</Text>
            <ul>
              <NavItem>
                <a href="https://instagram.com/wrench.cc" rel="nofollow">
                  Instagram
                </a>
              </NavItem>
              <NavItem>
                <a href="https://facebook.com/wrench.cc" rel="nofollow">
                  Facebook
                </a>
              </NavItem>
              <NavItem>
                <a href="https://twitter.com/wrench.cc" rel="nofollow">
                  Twitter
                </a>
              </NavItem>
            </ul>
          </Column>
        </Navigation>

        <Bottom>
          <Text fontSize={13} color="grey">
            Wrench is a project community founded in 2018 in Sweden. It’s designed, built and run
            from the heart of Stockholm.
          </Text>
          <Text fontSize={13} color="grey">
            © Wrench
          </Text>
        </Bottom>
      </Inner>
    </Base>
  )
}

export default Footer

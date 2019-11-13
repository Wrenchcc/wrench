import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { Text } from 'ui'
import { Base, Inner, Bottom, Navigation, Column, NavItem } from './styles'

function Footer() {
  const { t } = useTranslation()

  return (
    <Base>
      <Inner>
        <Navigation>
          <Column>
            <Text medium>Wrench</Text>
            <ul>
              <NavItem>
                <Link href="/about">
                  <a>{t('Footer:about')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/press">
                  <a>{t('Footer:press')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <a href="https://status.wrench.cc" rel="nofollow">
                  {t('Footer:status')}
                </a>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('Footer:help')}</Text>
            <ul>
              <NavItem>
                <a href="mailto:support@wrench.cc">{t('Footer:mail')}</a>
              </NavItem>
              <NavItem>
                <a href="mailto:feedback@wrench.cc">{t('Footer:feedback')}</a>
              </NavItem>
              <NavItem>
                <Link href="/faq">
                  <a>{t('Footer:faq')}</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('Footer:legal')}</Text>
            <ul>
              <NavItem>
                <Link href="/terms">
                  <a>{t('Footer:terms')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/policy">
                  <a>{t('Footer:policy')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/eula">
                  <a>{t('Footer:eula')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/cookies">
                  <a>{t('Footer:cookies')}</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('Footer:social')}</Text>
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
            {t('Footer:description')}
          </Text>
          <Text fontSize={13} color="grey">
            © Wrench (v.{process.env.BUILD_ID})
          </Text>
        </Bottom>
      </Inner>
    </Base>
  )
}

export default Footer

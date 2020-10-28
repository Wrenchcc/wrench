import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'i18n'
import { Text, LanguageSelector } from 'ui'
import { Base, Inner, Bottom, Navigation, Column, NavItem, Left, Right } from './styles'

function Footer() {
  const { t } = useTranslation('footer')

  return (
    <Base>
      <Inner>
        <Navigation>
          <Column>
            <Text medium>Wrench</Text>
            <ul>
              <NavItem>
                <Link href="/about">
                  <a>{t('ABOUT')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/press">
                  <a>{t('PRESS')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/blog">
                  <a>{t('BLOG')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/download">
                  <a>{t('DOWNLOAD')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <a href="https://status.wrench.cc" rel="nofollow">
                  {t('STATUS')}
                </a>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('HELP')}</Text>
            <ul>
              <NavItem>
                <a href="mailto:support@wrench.cc">{t('MAIL')}</a>
              </NavItem>
              <NavItem>
                <a href="mailto:feedback@wrench.cc">{t('FEEDBACK')}</a>
              </NavItem>
              <NavItem>
                <a href="https://m.me/wrench.cc" rel="nofollow">
                  {t('CHAT')}
                </a>
              </NavItem>
              <NavItem>
                <Link href="/faq">
                  <a>{t('FAQ')}</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('LEGAL')}</Text>
            <ul>
              <NavItem>
                <Link href="/terms">
                  <a>{t('TERMS')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/policy">
                  <a>{t('POLICY')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/eula">
                  <a>{t('EULA')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/cookies">
                  <a>{t('COOKIES')}</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('SOCIAL')}</Text>
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
                <a href="https://twitter.com/cc_wrench" rel="nofollow">
                  Twitter
                </a>
              </NavItem>
            </ul>
          </Column>
        </Navigation>

        <Bottom>
          <Left>
            <Text fontSize={13} color="neutral">
              {t('DESCRIPTION')}
            </Text>

            <Text fontSize={13} color="neutral">
              {t('TRADEMARKS')}
            </Text>

            <Text fontSize={13} color="neutral">
              © Wrench Community AB (v.{process.env.BUILD_ID})
            </Text>
          </Left>
          <Right>
            <LanguageSelector />
          </Right>
        </Bottom>
      </Inner>
    </Base>
  )
}

export default Footer

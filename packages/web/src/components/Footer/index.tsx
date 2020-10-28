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
                  <a>{t('about')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/press">
                  <a>{t('press')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/blog">
                  <a>{t('blog')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/download">
                  <a>{t('download')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <a href="https://status.wrench.cc" rel="nofollow">
                  {t('status')}
                </a>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('help')}</Text>
            <ul>
              <NavItem>
                <a href="mailto:support@wrench.cc">{t('mail')}</a>
              </NavItem>
              <NavItem>
                <a href="mailto:feedback@wrench.cc">{t('feedback')}</a>
              </NavItem>
              <NavItem>
                <a href="https://m.me/wrench.cc" rel="nofollow">
                  {t('chat')}
                </a>
              </NavItem>
              <NavItem>
                <Link href="/faq">
                  <a>{t('faq')}</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('legal')}</Text>
            <ul>
              <NavItem>
                <Link href="/terms">
                  <a>{t('terms')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/policy">
                  <a>{t('policy')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/eula">
                  <a>{t('eula')}</a>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/cookies">
                  <a>{t('cookies')}</a>
                </Link>
              </NavItem>
            </ul>
          </Column>

          <Column>
            <Text medium>{t('social')}</Text>
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
              {t('description')}
            </Text>

            <Text fontSize={13} color="neutral">
              {t('trademarks')}
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

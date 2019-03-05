import * as React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo-hooks'
import { I18nextProvider, useSSR } from 'react-i18next'
import * as NProgress from 'nprogress'
import Router from 'next/router'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import Seo from '../utils/seo'
import withApollo from '../graphql/utils/withApollo'
import i18n from '../i18n'
import Header from '../components/Header'

NProgress.configure({ showSpinner: false })
Router.onRouteChangeStart = () => NProgress.start()
Router.onRouteChangeComplete = () => NProgress.done()
Router.onRouteChangeError = () => NProgress.done()

const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .image___xtQGH{display:block;width:100%;height:100%}
  .container___2O72F{position:relative;overflow:hidden;height:100%;width:100%}.overlay___IV4qY{position:absolute;top:0;left:0;bottom:0;right:0;opacity:0;cursor:zoom-in;transition:opacity .3s,transform .3s}.hover___MYy31,.loading___1pvNI,.zoom___3kqYk{opacity:1}.imageLoadingSpinnerContainer___3UIPD{position:absolute;top:0;right:0;bottom:0;left:0;background-color:#f4f4f4}
  .slide___3-Nqo{position:relative;display:block;box-sizing:border-box;height:0;margin:0;list-style-type:none}.slide___3-Nqo:focus{outline:none!important}.slideHorizontal___1NzNV{float:left}.slideInner___2mfX9{position:absolute;top:0;left:0;width:100%;height:100%}.focusRing___1airF{position:absolute;top:5px;right:5px;bottom:5px;left:5px;pointer-events:none;outline-width:5px;outline-style:solid;outline-color:Highlight}@media (-webkit-min-device-pixel-ratio:0){.focusRing___1airF{outline-style:auto;outline-color:-webkit-focus-ring-color}}
  .horizontalSlider___281Ls{position:relative;overflow:hidden}.horizontalSliderTray___1L-0W{overflow:hidden;width:100%}.verticalSlider___34ZFD{position:relative;overflow:hidden}.verticalSliderTray___267D8{overflow:hidden}.verticalTray___12Key{float:left}.verticalSlideTrayWrap___2nO7o{overflow:hidden}.sliderTray___-vHFQ{display:block;list-style:none;padding:0;margin:0}.sliderAnimation___300FY{transition:transform .5s;transition-timing-function:cubic-bezier(.645,.045,.355,1);will-change:transform}

  .carousel {position: relative;}
  .carousel__dot {
    cursor: pointer;
    width: 8px;
    height: 8px;
    display: inline-block;
    padding: 0;
    border: 1px solid white;
    border-radius: 8px;
    background: transparent;
    margin: 0 4px;
    outline: none;
  }

  .carousel__dot--selected {
    border-color: white;
    background: white;
  }
 
  .carousel__dot-group {
    position: absolute;
    bottom: 15px;
    z-index: 100;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .carousel__back-button,
  .carousel__next-button {
    position: absolute;
    top: 50%;
    z-index: 100;
  }

  .carousel__next-button {
    right: 0;
  }

  @supports (font-variation-settings: normal) {
    body {
      font-family: 'Inter var', system-ui, sans-serif;
    }
  }

  input[type="search"] {
    -webkit-appearance: textfield;
  }

  a {
    color: black;
    text-decoration: none;
  }

  #nprogress {
    pointer-events: none;
  }

  #nprogress .bar {
    background: black;
    position: fixed;
    z-index: 101;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
  }

  #nprogress .peg {
    display: block;
    position: absolute;
    right: 0px;
    width: 100px;
    height: 100%;
    box-shadow: 0 0 10px #29d, 0 0 5px #29d;
    opacity: 1.0;
    transform: rotate(3deg) translate(0px, -4px);
  }
`

class MyApp extends App {
  public static async getInitialProps({ Component, ctx }) {
    const { req } = ctx

    const initialI18nStore = {}
    let i18nServerInstance = null
    let initialLanguage = null

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    if (req && req.i18n) {
      req.i18n.languages.forEach(l => {
        initialI18nStore[l] = req.i18n.services.resourceStore.data[l]
      })

      initialLanguage = req.i18n.language

      req.i18n.toJSON = () => null
      i18nServerInstance = req.i18n
    }

    return {
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
      pageProps,
    }
  }

  render() {
    const {
      Component,
      pageProps,
      client,
      i18nServerInstance,
      initialI18nStore,
      initialLanguage,
    } = this.props

    return (
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18nServerInstance || i18n}>
          <AppWithi18n
            Component={Component}
            pageProps={pageProps}
            i18nServerInstance={i18nServerInstance}
            initialI18nStore={initialI18nStore}
            initialLanguage={initialLanguage}
          />
        </I18nextProvider>
      </ApolloProvider>
    )
  }
}

function AppWithi18n({ initialI18nStore, initialLanguage, pageProps, Component }) {
  useSSR(initialI18nStore, initialLanguage)

  return (
    <Container>
      <GlobalStyle />
      <Seo />
      <Header home />
      <Component {...pageProps} />
    </Container>
  )
}

export default withApollo(MyApp)

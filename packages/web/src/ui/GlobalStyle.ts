import { createGlobalStyle } from 'styled-components'
import PromoStyle from '../components/Promo/style'

const FONTS_ENDPOINT = 'https://edge-files.wrench.cc/static/fonts'

export default createGlobalStyle`
  ${PromoStyle}

  /* clears the ‘X’ from Internet Explorer */
  input[type=search]::-ms-clear { display: none; width : 0; height: 0; }
  input[type=search]::-ms-reveal { display: none; width : 0; height: 0; }
  /* clears the ‘X’ from Chrome */
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration { display: none; }

  * {
    outline: none !important;
  }

  button {
    background: none;

    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;
    background: transparent;

    color: inherit;
    font: inherit;

   line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
  }

  @font-face {
    font-family: 'Inter UI';
    font-style:  normal;
    font-weight: 400;
    src: url("${FONTS_ENDPOINT}/Inter-UI-Regular.woff2") format("woff2"),
         url("${FONTS_ENDPOINT}/Inter-UI-Regular.woff") format("woff");
  }

  @font-face {
    font-family: 'Inter UI';
    font-style:  normal;
    font-weight: 500;
    src: url("${FONTS_ENDPOINT}/Inter-UI-Medium.woff2") format("woff2"),
         url("${FONTS_ENDPOINT}/Inter-UI-Medium.woff") format("woff");
  }

  @font-face {
    font-family: 'Inter UI';
    font-style:  normal;
    font-weight: 700;
    src: url("${FONTS_ENDPOINT}/Inter-UI-Bold.woff2") format("woff2"),
         url("${FONTS_ENDPOINT}/Inter-UI-Bold.woff") format("woff");
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :root {
    --background: white;
    --foreground: black;
  }
  
  [data-theme='dark'] {
    --background: black;
    --foreground: white;
    background: black;
  }

  .image___xtQGH{display:block;width:100%;height:100%}
  .container___2O72F{position:relative;overflow:hidden;height:100%;width:100%}.overlay___IV4qY{position:absolute;top:0;left:0;bottom:0;right:0;opacity:0;cursor:zoom-in;transition:opacity .3s,transform .3s}.hover___MYy31,.loading___1pvNI,.zoom___3kqYk{opacity:1}.imageLoadingSpinnerContainer___3UIPD{position:absolute;top:0;right:0;bottom:0;left:0;background-color:#f4f4f4}
  .slide___3-Nqo{position:relative;display:block;box-sizing:border-box;height:0;margin:0;list-style-type:none}.slide___3-Nqo:focus{outline:none!important}.slideHorizontal___1NzNV{float:left}.slideInner___2mfX9{position:absolute;top:0;left:0;width:100%;height:100%}.focusRing___1airF{position:absolute;top:5px;right:5px;bottom:5px;left:5px;pointer-events:none;outline-width:5px;outline-style:solid;outline-color:Highlight}@media (-webkit-min-device-pixel-ratio:0){.focusRing___1airF{outline-style:auto;outline-color:-webkit-focus-ring-color}}
  .horizontalSlider___281Ls{position:relative;overflow:hidden}.horizontalSliderTray___1L-0W{overflow:hidden;width:100%}.verticalSlider___34ZFD{position:relative;overflow:hidden}.verticalSliderTray___267D8{overflow:hidden}.verticalTray___12Key{float:left}.verticalSlideTrayWrap___2nO7o{overflow:hidden}.sliderTray___-vHFQ{display:block;list-style:none;padding:0;margin:0}.sliderAnimation___300FY{transition:transform .5s;transition-timing-function:cubic-bezier(.645,.045,.355,1);will-change:transform}

  .carousel {position: relative; width: 100%;  height: 100%;}

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
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
  }

  .carousel__back-button,
  .carousel__next-button {
    position: absolute;
    top: 50%;
    z-index: 50;
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


  button {
    cursor: pointer;
  }

  a {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }

  [data-theme='dark'] a {
    color: white;
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

  [data-theme='dark'] #nprogress .bar {
    background: white;
  }

  .blog ul {
    list-style: disc;
    margin: 0;
    padding-left: 40px;
    outline: none;
  }

  .blog ul li {
    padding: 5.5px 0 5.5px 3px;
    line-height: 1.6em;
  }

  [data-theme='dark'] .blog p {
    color: #6d6f76;
  }

  [data-theme='dark'] li {
    color: #6d6f76;
  }

  [data-theme='dark'] .blog a {
    color: #6d6f76;
  }

  [data-theme='dark'] .blog .username {
    color: white;
  }

  [data-theme='dark'] .blog mark {
    background rgb(218 206 67);
  }

  .blog .content p {
    margin-bottom: 20px;
    line-height: 25px;
    font-size: 16px;
  }

  .blog .content b {
    font-weight: 700;
  }

  .blog .content i {
    font-style: italic;
  }

  .blog .content a {
    text-decoration: underline;
  }

  .blog mark {
    background: rgba(245,235,111,0.29);
    padding: 3px 0;
  }

  [data-theme='dark'] .link,
  [data-theme='dark'] .mention {
    color: white;
  }
`

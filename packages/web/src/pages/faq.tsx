import React from 'react'
import Seo from 'utils/seo'
import Footer from 'components/Footer'
import { Base } from 'ui/PageLayout'

function Faq() {
  return (
    <>
      <Seo
        config={{
          title: 'FAQ',
        }}
      />

      <Base>
        <h1>FAQ</h1>
      </Base>
      <Footer />
    </>
  )
}

export default Faq

// @ts-nocheck
import React from 'react'
import Image from 'ui/Image'
import Title from 'ui/Title'
import Footer from 'components/Footer'
import { Container, Inner, Column } from './styles'

function Business() {
  return (
    <>
      <Container>
        <Inner>
          <Column>
            <Title medium color="white" style={{ marginTop: 100 }}>
              Wanna advertise on the biggest motorcycle community in the world?
            </Title>
          </Column>
          <Column>
            <Image
              source="https://edge-files.wrench.cc/static/images/business-bg.jpg"
              quality="100"
              width="625"
              height="632"
              style={{ width: '100%', height: 'auto' }}
            />
          </Column>
        </Inner>
      </Container>

      <Footer />
    </>
  )
}

export default Business

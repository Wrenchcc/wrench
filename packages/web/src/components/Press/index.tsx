// @ts-nocheck
import React from 'react'
import Seo from 'utils/seo'
import { Title, Text } from 'ui'
import Footer from 'components/Footer'
import Image from 'ui/NextImage'
import { Inner, Column, Row } from './styles'

const founders = [
  'https://edge-files.wrench.cc/static/images/viktor@3x.jpg',
  'https://edge-files.wrench.cc/static/images/pontus@3x.jpg',
  'https://edge-files.wrench.cc/static/images/felix@3x.jpg',
]

function Press() {
  return (
    <>
      <Seo
        config={{
          title: 'Press',
        }}
      />

      <Inner>
        <Title medium style={{ marginBottom: 10 }}>
          Press
        </Title>
        <Text color="neutral">Here you can find our most common requested press assets.</Text>

        <Row>
          <Column>
            <Image
              width={208}
              height={208}
              src={'https://edge-files.wrench.cc/static/email/logo.jpg'}
            />
            <br />
            <Text medium>Logo - black</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image width={208} height={208} src={founders[0]} />
            <br />
            <Text medium>Viktor - CPO</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image width={208} height={208} src={founders[1]} />
            <br />
            <Text medium>Pontus - CEO</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image width={208} height={208} src={founders[2]} />
            <br />
            <Text medium>Felix - CMO</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image
              width={208}
              height={208}
              src={'https://edge-files.wrench.cc/static/images/about@3x.jpg'}
            />
            <br />
            <Text medium>Team</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
        </Row>
        <Row>
          <Column>
            <Image
              width={208}
              height={208}
              src={'https://edge-files.wrench.cc/static/images/share-preview.png'}
            />
            <br />
            <Text medium>App</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image
              width={208}
              height={208}
              src={'https://edge-files.wrench.cc/static/images/web.png'}
            />
            <br />
            <Text medium>Web</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image
              width={208}
              height={208}
              src={
                'https://edge-files.wrench.cc/images/665f5497-fcaf-4008-aba2-a5c96c4d4836.jpg?w=768'
              }
            />
            <br />
            <Text medium>Sample image</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image
              width={208}
              height={208}
              src={
                'https://edge-files.wrench.cc/images/5fb9ca43-8a5b-43f1-ae68-3b15295ec6b2.jpg?w=768'
              }
            />
            <br />
            <Text medium>Sample image</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
          <Column>
            <Image
              width={208}
              height={208}
              src={'https://edge-files.wrench.cc/static/video/poster.jpg'}
            />
            <br />
            <Text medium>Video</Text>
            <Text fontSize={15} color="accent" underline>
              Download
            </Text>
          </Column>
        </Row>
      </Inner>

      <Text fontSize={24} center>
        <a href="mailto:press@wrench.cc">press@wrench.cc</a>
      </Text>

      <Text color="accent" center fontSize={14}>
        <br />
        Please get in touch if you have any questions.
      </Text>

      <Footer />
    </>
  )
}

export default Press

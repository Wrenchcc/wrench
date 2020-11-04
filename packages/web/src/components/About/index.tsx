// @ts-nocheck
import React from 'react'
import Image from 'ui/NextImage'
import Seo from 'utils/seo'
import { Title, Text } from 'ui'
import Footer from 'components/Footer'
import { Inner, Row, Center, Person, PersonPicture, Team } from './styles'

function About() {
  return (
    <>
      <Seo
        config={{
          title: 'About us',
        }}
      />

      <Inner>
        <Center>
          <Title medium>About us</Title>
          <br />
          <br />
          <Image
            src="https://edge-files.wrench.cc/static/images/about@3x.jpg"
            width="780"
            height="360"
            quality="100"
            style={{ width: '100%', height: 'auto' }}
          />
          <br />
          <br />
          <Text medium>
            Wrench is one of the fastest-growing social networks targeting enthusiasts from all
            around the globe to document their builds, share their knowledge, and learn from
            like-minded.
          </Text>
          <br />
          <br />
          <Text color="neutral">
            The whole idea with Wrench came up after Pontus, an experienced hobby builder of custom
            cafe racers didn’t find any good forums or communities that gather all the
            bike-aficionados to share their projects with each other. Instead of searching thru
            thousands of small old-school forums and Facebook groups to find what suits you, Wrench
            gathers us - the motorcycle fanatics in one place.
            <br />
            <br />
            The team today is a truly cross experienced team. With knowledge and experience from
            working with and at companies such as Klarna, Qapital, Norwegian, Urbanears, H&M, and
            Budbee we’ve gathered an extremely hungry team.
            <br />
            <br />
            If you want to be part of the journey towards conquering the automotive industry send us
            an email at <a href="mailto:work@wrench.cc">work@wrench.cc</a>
          </Text>
          <Team>
            <Person>
              <PersonPicture>
                <Image
                  src="https://edge-files.wrench.cc/static/images/pontus@3x.jpg"
                  width="360"
                  height="330"
                  quality="100"
                  style={{ width: '100%', height: 'auto' }}
                />

                <br />
                <br />

                <Text bold>Pontus Abrahamsson</Text>
                <Text color="neutral">CEO</Text>
                <br />
                <a href="mailto:pontus@wrench.cc">pontus@wrench.cc</a>
              </PersonPicture>
            </Person>

            <Person>
              <PersonPicture>
                <Image
                  src="https://edge-files.wrench.cc/static/images/viktor@3x.jpg"
                  width="360"
                  height="330"
                  quality="100"
                  style={{ width: '100%', height: 'auto' }}
                />

                <br />
                <br />

                <Text bold>Viktor Hofte</Text>
                <Text color="neutral">CPO</Text>
                <br />
                <a href="mailto:viktor@wrench.cc">viktor@wrench.cc</a>
              </PersonPicture>
            </Person>
          </Team>
          <Team>
            <Person>
              <PersonPicture>
                <Image
                  src="https://edge-files.wrench.cc/static/images/felix@3x.jpg"
                  width="360"
                  height="330"
                  quality="100"
                  style={{ width: '100%', height: 'auto' }}
                />

                <br />
                <br />

                <Text bold>Felix Hofte</Text>
                <Text color="neutral">CMO</Text>
                <br />
                <a href="mailto:felix@wrench.cc">felix@wrench.cc</a>
              </PersonPicture>
            </Person>

            <Person>
              <PersonPicture>
                <Image
                  src="https://edge-files.wrench.cc/static/images/plus@3x.jpg"
                  width="360"
                  height="330"
                  quality="100"
                  style={{ width: '100%', height: 'auto' }}
                />
                <br />
                <br />

                <Text bold>2 open posistions</Text>
                <Text color="neutral">Fullstack developers (JS)</Text>
                <br />
                <a href="mailto:work@wrench.cc">work@wrench.cc</a>
              </PersonPicture>
            </Person>
          </Team>
        </Center>
      </Inner>

      <Footer />
    </>
  )
}

export default About

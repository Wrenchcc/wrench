// @ts-nocheck
import React from 'react'
import Seo from 'utils/seo'
import { Title, Text } from 'ui'
import Footer from 'components/Footer'
import { Inner, Row, Image, Center, Person, PersonPicture, Team } from './styles'

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
          <Image>
            <source
              srcSet={`${require('./about.jpg')} 1x, ${require('./about@2x.jpg')} 2x, ${require('./about@2x.jpg')} 3x`}
              type="image/jpeg"
            />

            <img src={require('./about.jpg')} />
          </Image>

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
                <source
                  srcSet={`${require('./pontus.jpg')} 1x, ${require('./pontus@2x.jpg')} 2x, ${require('./pontus@2x.jpg')} 3x`}
                  type="image/jpeg"
                />

                <img src={require('./pontus.jpg')} />
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
                <source
                  srcSet={`${require('./viktor.jpg')} 1x, ${require('./viktor@2x.jpg')} 2x, ${require('./viktor@2x.jpg')} 3x`}
                  type="image/jpeg"
                />

                <img src={require('./viktor.jpg')} />
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
                <source
                  srcSet={`${require('./felix.jpg')} 1x, ${require('./felix@2x.jpg')} 2x, ${require('./felix@2x.jpg')} 3x`}
                  type="image/jpeg"
                />

                <img src={require('./felix.jpg')} />
                <br />
                <br />

                <Text bold>Felix Hofte</Text>
                <Text color="neutral">Head Of Marketing</Text>
                <br />
                <a href="mailto:felix@wrench.cc">felix@wrench.cc</a>
              </PersonPicture>
            </Person>

            <Person>
              <PersonPicture>
                <source
                  srcSet={`${require('./plus.jpg')} 1x, ${require('./plus@2x.jpg')} 2x, ${require('./plus@2x.jpg')} 3x`}
                  type="image/jpeg"
                />

                <img src={require('./plus.jpg')} />
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

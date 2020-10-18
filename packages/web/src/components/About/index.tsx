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
          <Title fontSize={30}>About us</Title>
          <Image>
            <source
              srcSet={`${require('./about.jpg')} 1x, ${require('./about@2x.jpg')} 2x, ${require('./about@2x.jpg')} 3x`}
              type="image/jpeg"
            />

            <img src={require('./about.jpg')} />
          </Image>

          <Text medium>
            Text about why we created Wrench Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Morbi pretium ornare erat sit amet rutrum. Curabitur scelerisque velit ut aliquam
            fermentum. Nunc id tellus ut nibh dignissim finibus.
          </Text>

          <br />
          <br />
          <Text color="grey">
            In arcu dolor, congue a volutpat eu, gravida nec ipsum. Vestibulum ante ipsum primis in
            faucibus orci luctus et ultrices posuere cubilia Curae; Nam felis augue, rhoncus vitae
            vulputate a, bibendum id nisl. Sed eget quam consequat, convallis justo nec, tempor sem.
            Pellentesque ultrices nunc nec enim tincidunt auctor. Vivamus luctus eu dui ut mattis.
            Morbi venenatis nisi quis imperdiet tincidunt. Mauris pellentesque turpis ac tortor
            finibus rutrum. Integer luctus erat velit, sed ullamcorper ipsum congue ut.
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
                <Text color="grey">CEO</Text>
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
                <Text color="grey">CPO</Text>
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
                <Text color="grey">Head Of Marketing</Text>
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

                <Text bold>2 full stack developers</Text>
                <Text color="grey">Development</Text>
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

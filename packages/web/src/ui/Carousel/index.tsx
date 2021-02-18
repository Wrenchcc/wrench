import React, { Fragment } from 'react'
import { CarouselProvider } from 'pure-react-carousel'
import { ArrowLeftAlternativeIcon, ArrowRightAlternativeIcon } from '@wrench/ui'
import { Base, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from './styles'

function Carousel({ files }) {
  console.log(files)
  return (
    <Base>
      <CarouselProvider
        touchEnabled={files.length > 0}
        naturalSlideWidth={650}
        naturalSlideHeight={650}
        totalSlides={files.edges.length}
        dragEnabled={false}
      >
        <Slider>
          {files.edges.map(({ node }, index) => (
            <Slide index={index} key={index}>
              <Image source={node.uri} key={node.id} width={640} height={640} />
            </Slide>
          ))}
        </Slider>
        {files.edges.length > 1 && (
          <Fragment>
            <DotGroup />
            <ButtonBack>
              <ArrowLeftAlternativeIcon />
            </ButtonBack>
            <ButtonNext>
              <ArrowRightAlternativeIcon />
            </ButtonNext>
          </Fragment>
        )}
      </CarouselProvider>
    </Base>
  )
}

export default Carousel

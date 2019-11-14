// @ts-nocheck
import React, { memo, Fragment } from 'react'
import { CarouselProvider } from 'pure-react-carousel'
import Image from '../Image'
import { Base, Slider, Slide, ButtonBack, ButtonNext, DotGroup } from './styles'

const Carousel = memo(function Carousel({ files }) {
  return (
    <Base>
      <CarouselProvider
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
            <ButtonBack>Back</ButtonBack>
            <ButtonNext>Next</ButtonNext>
          </Fragment>
        )}
      </CarouselProvider>
    </Base>
  )
})

export default Carousel

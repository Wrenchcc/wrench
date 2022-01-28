import React, { Fragment, useRef, useEffect } from 'react'
import { CarouselProvider } from 'pure-react-carousel'
import { ArrowLeftAlternativeIcon, ArrowRightAlternativeIcon } from '@wrench/ui'
import { Base, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from './styles'

function Video({ source }) {
  const videoRef = useRef(null)

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: [0.25, 0.75],
    }

    const handlePlay = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoRef?.current?.play()
        } else {
          videoRef?.current?.pause()
        }
      })
    }

    const observer = new IntersectionObserver(handlePlay, options)

    observer.observe(videoRef.current)
  })

  return <video width={640} height={640} ref={videoRef} muted src={source}></video>
}

function Carousel({ files }) {
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
              {node.type === 'IMAGE' ? (
                <Image source={node.uri} key={node.id} width={640} height={640} />
              ) : (
                <Video source={node.uri} key={node.id} />
              )}
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

// @ts-nocheck
import React, { Fragment, useRef, useEffect, useState, useCallback } from 'react'
import { CarouselProvider } from 'pure-react-carousel'
import { ArrowLeftAlternativeIcon, ArrowRightAlternativeIcon, SparkIcon } from '@wrench/ui'
import { Base, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from './styles'

function Video({ source }) {
  const [isMuted, setMuted] = useState(true)
  const isPlaying = useRef(false)
  const videoRef = useRef(null)

  const togglePlay = useCallback(() => {
    if (isPlaying.current) {
      isPlaying.current = false
      videoRef?.current?.pause()
    } else {
      isPlaying.current = true
      videoRef?.current?.play()
    }
  }, [])

  const toggleMuted = useCallback(() => {
    setMuted(!isMuted)
  }, [isMuted])

  useEffect(() => {
    const options = {
      rootMargin: '0px',
      threshold: [0.25, 0.75],
    }

    const handlePlay = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isPlaying.current = true
          videoRef?.current?.play()
        } else {
          isPlaying.current = false
          videoRef?.current?.pause()
        }
      })
    }

    const observer = new IntersectionObserver(handlePlay, options)

    observer.observe(videoRef.current)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <video
        width={640}
        height={640}
        ref={videoRef}
        muted={isMuted}
        src={source}
        onClick={togglePlay}
      ></video>
      {/* <SparkIcon onClick={toggleMuted} style={{ position: 'absolute', right: 20, bottom: 20 }} /> */}
    </div>
  )
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

import React, { useRef, useEffect } from 'react';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import {
  TapGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
} from 'react-native-gesture-handler';
import { CROP_AREA, HEADER_HEIGHT } from '../constants';
import Grid from './Grid';

function ImageEditor({ source }) {
  const pinchRef = useRef(null);
  const tapRef = useRef(null);
  const panRef = useRef(null);

  // const boundX = 0;
  // const boundY = 0;

  const gridOpacity = useSharedValue(0);
  const scale = useSharedValue(1);
  // const focalX = useSharedValue(0);
  // const focalY = useSharedValue(0);

  const velocityY = useSharedValue(0);
  const velocityX = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);

  // NOTE: Reset between images
  useEffect(() => {
    translationX.value = 0;
    translationY.value = 0;
  }, [source]);

  const handlePinch = useAnimatedGestureHandler({
    // onStart: (event, ctx) => {
    //   console.log('wefwef1', event);
    // },
    // onActive: (event, ctx) => {
    //   console.log('wefwef2', event);
    // },
    // onEnd: (_) => {
    //   console.log('wefwef');
    // },
  });

  const handleTap = useAnimatedGestureHandler({
    onStart: () => {
      gridOpacity.value = withTiming(1, {
        duration: 250,
      });
    },
    onEnd: () => {
      gridOpacity.value = withTiming(0, {
        duration: 250,
      });
    },
  });

  const handlePan = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.offsetX = translationX.value;
      ctx.offsetY = translationY.value;
    },
    onActive: (event, ctx) => {
      velocityY.value = event.velocityY;
      velocityX.value = event.velocityX;

      translationX.value = ctx.offsetX + event.translationX;
      translationY.value = ctx.offsetY + event.translationY;
    },
    onEnd: (_) => {
      translationX.value = withSpring(0, {
        damping: 40,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: true,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        velocity: velocityX.value, // divide(velocity, scale)
      });

      translationY.value = withSpring(0, {
        damping: 40,
        mass: 1,
        stiffness: 121.6,
        overshootClamping: true,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        velocity: velocityY.value, // divide(velocity, scale)
      });
    },
  });

  const imageStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    };
  });

  return (
    <Animated.View
      style={{
        backgroundColor: '#222',
        width: CROP_AREA,
        height: CROP_AREA,
        position: 'absolute',
        top: HEADER_HEIGHT,
        overflow: 'hidden',
      }}
    >
      <PinchGestureHandler
        shouldCancelWhenOutside={false}
        ref={pinchRef}
        simultaneousHandlers={[panRef, tapRef]}
        onGestureEvent={handlePinch}
      >
        <Animated.View>
          <PanGestureHandler
            ref={panRef}
            simultaneousHandlers={[pinchRef, tapRef]}
            onGestureEvent={handlePan}
          >
            <Animated.View>
              <TapGestureHandler
                maxDurationMs={10000000}
                ref={tapRef}
                simultaneousHandlers={[pinchRef, panRef]}
                onGestureEvent={handleTap}
              >
                <Animated.View>
                  <Animated.Image
                    resizeMode="contain"
                    source={source}
                    style={[
                      {
                        width: '100%',
                        height: '100%',
                      },
                      imageStyles,
                    ]}
                  />
                  <Grid opacity={gridOpacity} />
                </Animated.View>
              </TapGestureHandler>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PinchGestureHandler>
    </Animated.View>
  );
}

export default ImageEditor;

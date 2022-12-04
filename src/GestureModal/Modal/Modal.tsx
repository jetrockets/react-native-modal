import React from 'react';

import { LayoutRectangle, Platform, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { STARTING_POSITION, SH_COLORS } from './constants';
import s from './styles';
import { Props } from './types';

const Modal = React.memo(({ visible, setVisible, children, destroy }: Props) => {
  const windowDimensions = useWindowDimensions();
  const contentHeightRef = React.useRef<LayoutRectangle['height']>(windowDimensions.height);

  const scrollY = useSharedValue(windowDimensions.height);

  useAnimatedReaction(
    () => {
      if (visible) return STARTING_POSITION;

      return contentHeightRef.current;
    },
    (result, previous) => {
      if (result === previous) return;

      scrollY.value = withTiming(result, {}, () => {
        if (result === contentHeightRef.current) runOnJS(destroy)();
      });
    },
    [visible],
  );

  const eventHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      if (event.translationY < 0) return;

      scrollY.value = Math.round(STARTING_POSITION + event.translationY);
    },
    onEnd: (event) => {
      console.log('contentHeightRef.current', event.translationY, windowDimensions.height, contentHeightRef.current);
      if (event.translationY >= contentHeightRef.current / 2) return runOnJS(setVisible)(false);

      if (Platform.OS === 'ios') return (scrollY.value = withSpring(STARTING_POSITION));
      scrollY.value = withTiming(STARTING_POSITION, {});
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return { backgroundColor: interpolateColor(scrollY.value, [0, contentHeightRef.current], SH_COLORS) };
  });

  const containerStyles = useAnimatedStyle(() => ({ transform: [{ translateY: scrollY.value }] }));

  return (
    <Animated.View style={[StyleSheet.flatten({ flex: 1 }), animatedStyles]}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[StyleSheet.flatten({ flex: 1, justifyContent: 'flex-end' }), containerStyles]}>
          <View onLayout={({ nativeEvent }) => (contentHeightRef.current = nativeEvent.layout.height)}>
            {children}

            <View style={StyleSheet.flatten({ height: STARTING_POSITION, backgroundColor: '#fff' })} />
          </View>

          {/* Overlay start */}
          <Pressable
            onPress={() => setVisible(false)}
            style={[s.overlay, StyleSheet.flatten({ top: -STARTING_POSITION })]}
          />
          {/* Overlay end */}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
});

export default Modal;

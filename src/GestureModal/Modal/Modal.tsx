import React from 'react';

import { LayoutRectangle, Platform, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
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
import styles from './styles';
import { Props } from './types';

const Modal = React.memo(({ visible, setVisible, children, destroy }: Props) => {
  const windowDimensions = useWindowDimensions();
  const [contentHeight, setContentHeight] = React.useState<LayoutRectangle['height']>(windowDimensions.height);

  const scrollY = useSharedValue(windowDimensions.height);

  const targetHeight = React.useMemo(() => contentHeight + STARTING_POSITION, [contentHeight]);

  useAnimatedReaction(
    () => {
      if (visible) return STARTING_POSITION;

      return targetHeight;
    },
    (result, previous) => {
      if (result === previous) return;

      if (result === STARTING_POSITION && Platform.OS === 'ios') {
        return (scrollY.value = withSpring(result, { damping: 14, restSpeedThreshold: 250 }));
      }

      if (result === targetHeight) {
        return (scrollY.value = withTiming(result, {}, () => runOnJS(destroy)()));
      }

      scrollY.value = withTiming(result, {});
    },
    [visible],
  );

  const eventHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      if (event.translationY < 0) return;

      scrollY.value = Math.round(STARTING_POSITION + event.translationY);
    },
    onEnd: (event) => {
      const isOver = event.translationY / contentHeight >= 0.5;
      if (isOver) return runOnJS(setVisible)(false);

      if (Platform.OS === 'ios') return (scrollY.value = withSpring(STARTING_POSITION));
      scrollY.value = withTiming(STARTING_POSITION, {});
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    return { backgroundColor: interpolateColor(scrollY.value, [0, contentHeight], SH_COLORS) };
  });

  const containerStyles = useAnimatedStyle(() => ({ transform: [{ translateY: scrollY.value }] }));

  return (
    <Animated.View style={[StyleSheet.flatten({ flex: 1 }), animatedStyles]}>
      <PanGestureHandler onGestureEvent={eventHandler}>
        <Animated.View style={[StyleSheet.flatten({ flex: 1, justifyContent: 'flex-end' }), containerStyles]}>
          <View onLayout={({ nativeEvent }) => setContentHeight(nativeEvent.layout.height - STARTING_POSITION)}>
            {children}

            <View style={StyleSheet.flatten({ height: STARTING_POSITION, backgroundColor: '#fff' })} />
          </View>

          {/* Overlay start */}
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={[styles.overlay, StyleSheet.flatten({ top: -STARTING_POSITION })]}
          />
          {/* Overlay end */}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
});

export default Modal;

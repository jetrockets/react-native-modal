import React from 'react';

import { rgba } from 'polished';
import {
  LayoutRectangle,
  Modal as RNModal,
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { gestureHandlerRootHOC, PanGestureHandler } from 'react-native-gesture-handler';
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
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Props } from './types';

const STARTING_POSITION = 100;
const SH_COLORS = [rgba('#000', 0.5), rgba('#000', 0)];

const styles = StyleSheet.create({
  overlay: { zIndex: -1, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
});

const _GestureModal = React.memo(({ visible, setVisible, children, destroy }: Props) => {
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
            style={[styles.overlay, StyleSheet.flatten({ top: -STARTING_POSITION })]}
          />
          {/* Overlay end */}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
});

const GesturedModal = Platform.select({ android: gestureHandlerRootHOC(_GestureModal) }) || _GestureModal;

const GestureModal = (props: Omit<Props, 'destroy'>) => {
  const [visible, setVisible] = React.useState(props.visible);

  React.useEffect(() => {
    if (props.visible) setVisible(true);
  }, [props.visible]);

  return (
    <RNModal transparent={true} visible={visible}>
      <SafeAreaProvider>
        <GesturedModal {...props} destroy={() => setVisible(false)} />
      </SafeAreaProvider>
    </RNModal>
  );
};

export default GestureModal;

import { View, Image, ScrollView, useWindowDimensions } from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
type MarqueeItemProps = {
  EVENT: any;
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
};

function MarqueeItem({ EVENT, index, scroll, containerWidth, itemWidth }: MarqueeItemProps) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const shift = (containerWidth - SCREEN_WIDTH) / 2;
  const initialPosition = index * itemWidth - shift;
  const animatedStyle = useAnimatedStyle(() => {
    const position = ((initialPosition - scroll.value) % containerWidth) + shift;
    return {
      left: position,
    };
  });
  return (
    <Animated.View
      className="absolute h-full w-96  p-3 shadow-md"
      key={EVENT.id}
      style={[{ width: itemWidth }, animatedStyle]}>
      <Image source={EVENT.image} className="h-full w-full rounded-3xl " />
    </Animated.View>
  );
}

const Marquee = ({ EVENTS }: { EVENTS: any[] }) => {
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50); // pixels per frame
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const itemWidth = SCREEN_WIDTH * 0.65;

  const containerWidth = EVENTS.length * itemWidth;
  useFrameCallback(({ timeSincePreviousFrame }) => {
    const delta = (timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * delta;
  });
  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
    })
    .onChange((event) => {
      scrollSpeed.value = scrollSpeed.value - event.changeX;
    })
    .onFinalize(({ velocityX }) => {
      scrollSpeed.value = -velocityX;
      scrollSpeed.value = withTiming(50, { duration: 1000, easing: Easing.out(Easing.quad) });
    });
  return (
    <GestureDetector gesture={gesture}>
      <View className="h-full flex-row ">
        {EVENTS.map((event, index) => (
          <MarqueeItem
            key={event.id}
            EVENT={event}
            index={index}
            scroll={scroll}
            containerWidth={containerWidth}
            itemWidth={itemWidth}
          />
        ))}
      </View>
    </GestureDetector>
  );
};

export default Marquee;

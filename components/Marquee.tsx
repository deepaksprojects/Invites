import { View, Image, ScrollView, useWindowDimensions } from 'react-native';
import React, { Children, PropsWithChildren, useEffect, useState } from 'react';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
type MarqueeItemProps = {
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
};

function MarqueeItem({
  index,
  scroll,
  containerWidth,
  itemWidth,
  children,
}: PropsWithChildren<MarqueeItemProps>) {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const shift = (containerWidth - SCREEN_WIDTH) / 2;
  const initialPosition = index * itemWidth - shift;
  const animatedStyle = useAnimatedStyle(() => {
    const position =
      ((((initialPosition - scroll.value) % containerWidth) + containerWidth) % containerWidth) -
      shift;
    const rotation = interpolate(position, [0, SCREEN_WIDTH - itemWidth], [-1, 1]);
    const translateY = interpolate(
      position,
      [0, (SCREEN_WIDTH - itemWidth) / 2, SCREEN_WIDTH - itemWidth],
      [2, 0, 2]
    );
    return {
      left: position,
      transform: [{ rotate: `${rotation}deg` }, { translateY }],
    };
  });
  return (
    <Animated.View
      className="absolute h-full w-96  p-2 shadow-md"
      style={[{ width: itemWidth, transformOrigin: 'bottom' }, animatedStyle]}>
      {children}
    </Animated.View>
  );
}

const Marquee = ({
  EVENTS,
  onIndexChange,
  renderItem,
}: {
  EVENTS: any[];
  onIndexChange?: (index: number) => void;
  renderItem: (item: any) => React.ReactNode;
}) => {
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50); // pixels per frame
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const itemWidth = SCREEN_WIDTH * 0.65;

  const containerWidth = EVENTS.length * itemWidth;
  useFrameCallback(({ timeSincePreviousFrame }) => {
    const delta = (timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * delta;
    if (scroll.value < 0) {
      scroll.value += containerWidth;
    }
  });

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex);
    }
  }, [activeIndex]);
  useAnimatedReaction(
    () => scroll.value,
    (value) => {
      const normalizedValue = (value + SCREEN_WIDTH / 2) % containerWidth;
      const activeIndex = Math.floor(normalizedValue / itemWidth);
      runOnJS(setActiveIndex)(activeIndex);
    }
  );
  const gesture = Gesture.Pan()
    .onBegin(() => {
      scrollSpeed.value = 0;
    })
    .onChange((event) => {
      scrollSpeed.value = scrollSpeed.value - event.changeX;
      scroll.value -= event.changeX;
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
            index={index}
            scroll={scroll}
            containerWidth={containerWidth}
            itemWidth={itemWidth}>
            {renderItem({ event, index })}
          </MarqueeItem>
        ))}
      </View>
    </GestureDetector>
  );
};

export default Marquee;

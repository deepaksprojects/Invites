import { View, Image, ScrollView } from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
} from 'react-native-reanimated';
const itemWidth = 250;
type MarqueeItemProps = {
  EVENT: any;
  index: number;
  scroll: SharedValue<number>;
};

function MarqueeItem({ EVENT, index, scroll }: MarqueeItemProps) {
  const initialPosition = index * itemWidth;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: initialPosition - scroll.value,
    };
  });
  return (
    <Animated.View
      className="absolute h-full w-96  p-5 shadow-md"
      key={EVENT.id}
      style={[{ width: itemWidth }, animatedStyle]}>
      <Image source={EVENT.image} className="h-full w-full rounded-3xl " />
    </Animated.View>
  );
}

const Marquee = ({ EVENTS }: { EVENTS: any[] }) => {
  const scroll = useSharedValue(0);
  const scrollSpeed = 50; // pixels per frame
  useFrameCallback(({ timeSincePreviousFrame }) => {
    const delta = (timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed * delta;
  });
  return (
    <View className="h-full flex-row ">
      {EVENTS.map((event, index) => (
        <MarqueeItem key={event.id} EVENT={event} index={index} scroll={scroll} />
      ))}
    </View>
  );
};

export default Marquee;

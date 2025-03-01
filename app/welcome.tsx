import { View, Text, Pressable, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const EVENTS = [
  {
    id: 1,
    image: require('../assets/images/1.jpg'),
  },
  {
    id: 2,
    image: require('../assets/images/2.jpg'),
  },
  {
    id: 3,
    image: require('../assets/images/3.jpg'),
  },
  {
    id: 4,
    image: require('../assets/images/4.jpg'),
  },
  {
    id: 5,
    image: require('../assets/images/5.jpg'),
  },
  {
    id: 6,
    image: require('../assets/images/6.jpg'),
  },
  {
    id: 7,
    image: require('../assets/images/7.jpg'),
  },
  {
    id: 8,
    image: require('../assets/images/8.jpg'),
  },
];

const WelcomeScreen = () => {
  const [currentEvent, setCurrentEvent] = useState(0);
  function handleActiveEvent() {
    setCurrentEvent(currentEvent >= EVENTS.length - 1 ? 0 : currentEvent + 1);
  }
  return (
    <View className="flex-1 items-center">
      <Animated.Image
        key={currentEvent}
        source={EVENTS[currentEvent].image}
        className="absolute left-0 top-0 h-full w-full"
        resizeMode="cover"
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      />
      <View className="absolute left-0 top-0 h-full w-full bg-black/50" />
      <BlurView intensity={100}>
        <SafeAreaView>
          <View className="h-3/5 w-full">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {EVENTS.map((event) => (
                <View className="h-full w-96 p-5" key={event.id}>
                  <Image source={event.image} className="h-full w-full rounded-3xl " />
                </View>
              ))}
            </ScrollView>
          </View>

          <View className="flex-1 justify-center gap-4  p-4">
            <Text className="text-center text-2xl  text-white/60">Welcome to</Text>
            <Text className="text-center text-5xl font-bold text-white">Invites</Text>
            <Text className="mb-5 text-center  text-lg text-white/60 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur id illo ratione
              facere similique eos ex sunt at quam inventore, sit adipisci
            </Text>
            <Pressable
              onPress={handleActiveEvent}
              className="items-center self-center rounded-full bg-white px-10 py-4">
              <Text className="text-lg">Create an event</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
};

export default WelcomeScreen;

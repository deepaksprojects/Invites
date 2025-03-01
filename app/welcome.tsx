import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const WelcomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 items-center  bg-yellow-950">
      <View className="h-3/5 w-full bg-gray-400"></View>

      <View className="flex-1 justify-center gap-4  p-4">
        <Text className="text-center text-2xl  text-white/60">Welcome to</Text>
        <Text className="text-center text-5xl font-bold text-white">Invites</Text>
        <Text className="mb-5 text-center  text-lg text-white/60 ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur id illo ratione facere
          similique eos ex sunt at quam inventore, sit adipisci
        </Text>
        <Pressable className="items-center self-center rounded-full bg-white px-10 py-4">
          <Text className="text-lg">Create an event</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

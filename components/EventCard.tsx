import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

const EventCard = ({ event }: { event: any }) => {
  return (
    <View className="h-full w-full justify-end  overflow-hidden rounded-3xl">
      <Image source={event.image} className=" absolute h-full w-full" />
      <BlurView intensity={6} className=" h-24 w-full justify-center">
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <Text className="text-center text-2xl text-white">Hello world</Text>
      </BlurView>
    </View>
  );
};

export default EventCard;

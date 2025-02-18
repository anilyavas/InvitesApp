import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EventCard({ event }: { event: any }) {
  return (
    <View className="h-full w-full items-center justify-end  overflow-hidden rounded-3xl">
      <Image source={event.image} className="absolute h-full w-full" />
      <BlurView className="h-24 w-full justify-center" intensity={20}>
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.8)']}
          style={StyleSheet.absoluteFill}
        />
        <Text className="text-center text-2xl text-white">Birthday Party</Text>
      </BlurView>
    </View>
  );
}

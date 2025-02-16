import { BlurView } from 'expo-blur';
import { View, Text, Pressable, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const events = [
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
];

export default function WelcomeScreen() {
  return (
    <View className="flex-1 items-center">
      <Image source={events[0].image} className="absolute bottom-0 left-0 right-0 top-0" />
      <View className="absolute bottom-0 left-0 right-0 top-0 bg-black/50" />
      <BlurView intensity={100}>
        <SafeAreaView>
          <View className="h-3/5 w-full">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {events.map((event) => (
                <View className="h-full w-96 p-5" key={event.id}>
                  <Image source={event.image} className="h-full w-full rounded-3xl" />
                </View>
              ))}
            </ScrollView>
          </View>

          <View className="flex-1 justify-center gap-4 p-4">
            <Text className="text-center text-2xl font-bold text-white/60">Welcome to</Text>
            <Text className="text-center text-5xl font-bold text-white">Apple Invites</Text>
            <Text className="mb-5 text-center text-lg text-white/60">
              Create beautiful invitation for your events. Anyone can receive your invitations.
            </Text>
            <Pressable className="items-center self-center rounded-full bg-white px-10 py-4">
              <Text className="text-lg">Create an Event</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}

import { BlurView } from 'expo-blur';
import { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, { FadeIn, FadeInUp, FadeOut, SlideInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import EventCard from '~/components/EventCard';
import Marquee from '~/components/Marquee';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
];

export default function WelcomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);

  const onButtonPress = () => {
    setActiveIndex(activeIndex >= events.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <View className="flex-1 items-center">
      <Animated.Image
        key={events[activeIndex].image}
        source={events[activeIndex].image}
        className="absolute left-0 top-0 h-full w-full"
        resizeMode="cover"
        entering={FadeIn.duration(1000)}
        exiting={FadeOut.duration(1000)}
      />
      <View className="absolute left-0 top-0 h-full w-full bg-black/70" />
      <BlurView intensity={50}>
        <SafeAreaView edges={['bottom']}>
          {/* Quick fix of slideinup bug which does not take safearea padding in consideration */}
          <Animated.View
            className="mt-20 h-1/2 w-full"
            entering={SlideInUp.springify().mass(1).damping(30)}>
            <Marquee
              items={events}
              onIndexChange={setActiveIndex}
              renderItem={({ item }) => <EventCard event={item} />}
            />
          </Animated.View>

          <View className="flex-1 justify-center gap-4 p-4">
            <Animated.Text
              className="text-center text-2xl font-bold text-white/60"
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}>
              Welcome to
            </Animated.Text>
            <Animated.Text
              className="text-center text-5xl font-bold text-white"
              entering={FadeIn.duration(500).delay(500)}>
              Fast 1 Invites
            </Animated.Text>
            <Animated.Text
              className="mb-5 text-center text-lg text-white/60"
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}>
              Create beautiful invitation for your events. Anyone can receive your invitations.
            </Animated.Text>
            <AnimatedPressable
              entering={FadeInUp.springify().mass(1).damping(30).delay(500)}
              className="items-center self-center rounded-full bg-white px-10 py-4"
              onPress={onButtonPress}>
              <Text className="text-lg">Create an Event</Text>
            </AnimatedPressable>
          </View>
        </SafeAreaView>
      </BlurView>
    </View>
  );
}

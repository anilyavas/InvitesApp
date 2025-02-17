import { View, Image } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const itemWidth = 250;

type MarqueeItemProps = {
  event: any;
  index: number;
  scroll: SharedValue<number>;
};

function MarqueeItem({ event, index, scroll }: MarqueeItemProps) {
  const initialPosition = itemWidth * index;
  const animatedStyle = useAnimatedStyle(() => {
    return {
      left: initialPosition - scroll.value,
    };
  });

  return (
    <Animated.View
      className="absolute  h-full p-5 shadow-md"
      style={[{ width: itemWidth }, animatedStyle]}>
      <Image source={event.image} className="h-full w-full rounded-3xl" />
    </Animated.View>
  );
}

export default function Marquee({ events }: { events: any[] }) {
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50);

  useFrameCallback((frameInfo) => {
    const deltaSecond = (frameInfo.timeSincePreviousFrame ?? 0) / 1000;
    scroll.value = scroll.value + scrollSpeed.value * deltaSecond;
  });

  const gesture = Gesture.Pan()
    .onBegin((event) => {
      scrollSpeed.value = 0;
    })
    .onStart((event) => {
      console.log('onstart');
    })
    .onChange((event) => {
      console.log('onchange', event.changeX);
      scroll.value = scroll.value - event.changeX;
    })
    .onFinalize((event) => {
      scrollSpeed.value = -event.velocityX;
      scrollSpeed.value = withTiming(50, { duration: 1000, easing: Easing.out(Easing.quad) });
    });

  return (
    <GestureDetector gesture={gesture}>
      <View className="h-full flex-row">
        {events.map((event, index) => (
          <MarqueeItem event={event} key={event.id} index={index} scroll={scroll} />
        ))}
      </View>
    </GestureDetector>
  );
}

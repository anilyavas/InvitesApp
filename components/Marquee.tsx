import { View, Image, useWindowDimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useFrameCallback,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
} from 'react-native-reanimated';

type MarqueeItemProps = {
  event: any;
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
};

function MarqueeItem({ event, index, scroll, containerWidth, itemWidth }: MarqueeItemProps) {
  const { width: screenWidth } = useWindowDimensions();

  const shift = (containerWidth - screenWidth) / 2;

  const initialPosition = itemWidth * index - shift;

  const animatedStyle = useAnimatedStyle(() => {
    const position = ((initialPosition - scroll.value) % containerWidth) + shift;
    const rotation = interpolate(position, [0, screenWidth - itemWidth], [-1, 1]);
    const translateY = interpolate(
      position,
      [0, (screenWidth - itemWidth) / 2, screenWidth - itemWidth],
      [3, 0, 3]
    );

    return {
      left: position,
      transform: [{ rotateZ: `${rotation}deg` }, { translateY }],
    };
  });

  return (
    <Animated.View
      className="absolute  h-full p-2 shadow-md"
      style={[{ width: itemWidth }, animatedStyle, { transformOrigin: 'bottom' }]}>
      <Image source={event.image} className="h-full w-full rounded-3xl" />
    </Animated.View>
  );
}

export default function Marquee({ events }: { events: any[] }) {
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth * 0.7;
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50);
  const containerWidth = events.length * itemWidth;
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
          <MarqueeItem
            event={event}
            key={event.id}
            index={index}
            scroll={scroll}
            itemWidth={itemWidth}
            containerWidth={containerWidth}
          />
        ))}
      </View>
    </GestureDetector>
  );
}

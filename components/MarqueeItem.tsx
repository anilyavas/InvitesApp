import { PropsWithChildren } from 'react';
import { useWindowDimensions } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';

type MarqueeItemProps = {
  index: number;
  scroll: SharedValue<number>;
  containerWidth: number;
  itemWidth: number;
};
export default function MarqueeItem({
  index,
  scroll,
  containerWidth,
  itemWidth,
  children,
}: PropsWithChildren<MarqueeItemProps>) {
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
      {children}
    </Animated.View>
  );
}

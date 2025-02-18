import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import {
  useFrameCallback,
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';

import MarqueeItem from './MarqueeItem';

export default function Marquee({
  items,
  onIndexChange,
  renderItem,
}: {
  items: any[];
  onIndexChange: (index: number) => void;
  renderItem: ({ item, index }: { item: any; index: number }) => React.ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
  const itemWidth = screenWidth * 0.7;
  const scroll = useSharedValue(0);
  const scrollSpeed = useSharedValue(50);
  const containerWidth = items.length * itemWidth;

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex);
    }
  }, [activeIndex]);

  useAnimatedReaction(
    () => scroll.value,
    (value) => {
      const normalizedScroll = (value + screenWidth / 2) % containerWidth;
      const activeIndex = Math.floor(normalizedScroll / itemWidth);
      runOnJS(setActiveIndex)(activeIndex);
    }
  );

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
        {items.map((item, index) => (
          <MarqueeItem
            key={item?.id}
            index={index}
            scroll={scroll}
            itemWidth={itemWidth}
            containerWidth={containerWidth}>
            {renderItem({ item, index })}
          </MarqueeItem>
        ))}
      </View>
    </GestureDetector>
  );
}

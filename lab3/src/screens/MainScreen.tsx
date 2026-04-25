import React from 'react';
import { View, Text } from 'react-native';
import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { useGame } from '../context/GameContext';

export default function MainScreen() {
  const { stats, updateStat, theme } = useGame();
  
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const addTap = () => { updateStat('taps', 1); updateStat('score', 1); };
  const addDoubleTap = () => { updateStat('doubleTaps', 1); updateStat('score', 2); };
  const addLongPress = () => { updateStat('longPresses', 1); updateStat('score', 5); };
  const addDrag = () => updateStat('drags', 1);
  const addSwipeRight = () => { updateStat('swipesRight', 1); updateStat('score', 5); };
  const addSwipeLeft = () => { updateStat('swipesLeft', 1); updateStat('score', 5); };
  const addPinch = () => { updateStat('pinches', 1); updateStat('score', 3); };

  const doubleTap = Gesture.Tap().numberOfTaps(2).runOnJS(true).onStart(() => {
    addDoubleTap();
    scale.value = withSpring(1.2, undefined, () => { scale.value = withSpring(1); });
  });

  const singleTap = Gesture.Tap().runOnJS(true).onStart(() => {
    addTap();
    scale.value = withSpring(0.9, undefined, () => { scale.value = withSpring(1); });
  });

  const longPress = Gesture.LongPress().minDuration(1000).runOnJS(true).onStart(() => {
    addLongPress();
  });

  const pan = Gesture.Pan()
    .onChange((event) => {
      translateX.value += event.changeX;
      translateY.value += event.changeY;
    })
    .onEnd(() => {
      runOnJS(addDrag)();
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    });

  const swipeRight = Gesture.Fling().direction(Directions.RIGHT).runOnJS(true).onStart(() => {
    addSwipeRight();
  });

  const swipeLeft = Gesture.Fling().direction(Directions.LEFT).runOnJS(true).onStart(() => {
    addSwipeLeft();
  });

  const pinch = Gesture.Pinch()
    .onChange((event) => {
      scale.value = event.scale;
    })
    .onEnd(() => {
      runOnJS(addPinch)();
      scale.value = withSpring(1);
    });

  const taps = Gesture.Exclusive(doubleTap, singleTap);
  const composedGestures = Gesture.Simultaneous(taps, longPress, pan, pinch, swipeRight, swipeLeft);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value }
    ]
  }));

  const isDark = theme === 'dark';

  return (
    <View className={`flex-1 items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <View className="mb-20 items-center">
        <Text className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>SCORE</Text>
        <Text className={`text-6xl font-bold ${isDark ? 'text-white' : 'text-blue-500'}`}>{stats.score}</Text>
      </View>

      <GestureDetector gesture={composedGestures}>
        <Animated.View 
          className={`w-40 h-40 rounded-full items-center justify-center border-4 ${isDark ? 'bg-blue-600 border-blue-400' : 'bg-blue-400 border-blue-200'}`}
          style={animatedStyle}
        >
          <Text className="text-white font-bold text-lg">Click Me!</Text>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useGame } from '../context/GameContext';

export default function ChallengesScreen() {
  const { stats, theme } = useGame();
  const isDark = theme === 'dark';
  const textCol = isDark ? 'text-white' : 'text-black';

  const challenges = [
    { title: 'Tap 10 times', current: stats.taps, target: 10 },
    { title: 'Double-tap 5 times', current: stats.doubleTaps, target: 5 },
    { title: 'Long press 3 seconds', current: stats.longPresses, target: 1 },
    { title: 'Drag the object', current: stats.drags, target: 1 },
    { title: 'Swipe Right', current: stats.swipesRight, target: 1 },
    { title: 'Swipe Left', current: stats.swipesLeft, target: 1 },
    { title: 'Pinch to resize', current: stats.pinches, target: 1 },
    { title: 'Reach 100 points', current: stats.score, target: 100 },
    { title: 'Secret: 5 Left Swipes', current: stats.swipesLeft, target: 5 }, // Власне завдання [cite: 265]
  ];

  return (
    <ScrollView className={`flex-1 p-5 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {challenges.map((c, i) => {
        const isDone = c.current >= c.target;
        return (
          <View key={i} className={`p-4 mb-3 rounded-xl flex-row justify-between items-center ${isDone ? 'bg-green-100' : (isDark ? 'bg-gray-800' : 'bg-gray-100')}`}>
            <View>
              <Text className={`font-bold text-lg ${isDone ? 'text-green-800' : textCol}`}>{c.title}</Text>
              <Text className={isDone ? 'text-green-600' : 'text-gray-500'}>
                {Math.min(c.current, c.target)} / {c.target}
              </Text>
            </View>
            {isDone && <Text className="text-2xl">✅</Text>}
          </View>
        );
      })}
    </ScrollView>
  );
}
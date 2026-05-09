import { useEffect } from "react";
import { useAnimatedStyle, useSharedValue, withDelay, withSpring, withTiming } from "react-native-reanimated";

export function useEntranceAnimation(delay = 0) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(22);

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 520 }));
    translateY.value = withDelay(delay, withSpring(0, { damping: 16, stiffness: 120 }));
  }, [delay, opacity, translateY]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }]
  }));
}

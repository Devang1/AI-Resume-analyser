import { useEffect } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

export default function ShimmerSkeleton({ width = "100%", height = 18, style }) {
  const translate = useSharedValue(-120);

  useEffect(() => {
    translate.value = withRepeat(withTiming(260, { duration: 1200 }), -1, false);
  }, [translate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translate.value }]
  }));

  return (
    <Animated.View style={[styles.base, { width, height }, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <LinearGradient colors={["transparent", "rgba(255,255,255,0.18)", "transparent"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.shine} />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  base: { overflow: "hidden", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.08)" },
  shine: { width: 120, height: "100%" }
});

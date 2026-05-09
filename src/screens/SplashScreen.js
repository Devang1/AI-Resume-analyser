import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { BrainCircuit } from "lucide-react-native";
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withSpring, withTiming } from "react-native-reanimated";
import Screen from "../components/Screen";
import { colors } from "../constants/theme";

export default function SplashScreen({ onDone }) {
  const scale = useSharedValue(0.75);
  const opacity = useSharedValue(0);
  const glow = useSharedValue(0.35);
  const textY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 700 });
    scale.value = withSpring(1, { damping: 10 });
    textY.value = withDelay(120, withTiming(0, { duration: 520 }));
    glow.value = withRepeat(withSequence(withTiming(1, { duration: 1100 }), withTiming(0.35, { duration: 1100 })), -1, true);
    const timer = setTimeout(onDone, 2100);
    return () => clearTimeout(timer);
  }, [glow, onDone, opacity, scale, textY]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ scale: scale.value }],
    shadowOpacity: glow.value
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: textY.value }]
  }));

  return (
    <Screen scroll={false} contentStyle={styles.root}>
      <Animated.View style={[styles.logo, logoStyle]}>
        <BrainCircuit color={colors.white} size={54} strokeWidth={2.2} />
      </Animated.View>
      <Animated.View style={textStyle}>
        <Text style={styles.title}>AI Resume Analyzer</Text>
        <Text style={styles.subtitle}>ATS intelligence for ambitious careers</Text>
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  logo: {
    width: 116,
    height: 116,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(99,102,241,0.18)",
    borderWidth: 1,
    borderColor: "rgba(139,92,246,0.55)",
    shadowColor: colors.accent,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 0 }
  },
  title: { color: colors.white, fontSize: 30, fontWeight: "900", marginTop: 28, textAlign: "center" },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 8, textAlign: "center" }
});

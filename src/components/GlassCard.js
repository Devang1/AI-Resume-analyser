import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";
import { colors, spacing } from "../constants/theme";

export default function GlassCard({ children, style, animatedStyle }) {
  return (
    <Animated.View style={[styles.shadow, animatedStyle]}>
      <BlurView intensity={26} tint="dark" style={[styles.card, style]}>
        {children}
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 12 }
  },
  card: {
    overflow: "hidden",
    borderRadius: spacing.radius,
    padding: 18,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder
  }
});

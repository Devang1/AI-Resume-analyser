import { StyleSheet, Text } from "react-native";
import Animated from "react-native-reanimated";
import { colors } from "../constants/theme";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";

export default function SkillTag({ label, tone = "primary", index = 0 }) {
  const animatedStyle = useEntranceAnimation(index * 70);
  const toneColor = tone === "success" ? colors.green : tone === "warning" ? colors.yellow : tone === "danger" ? colors.red : colors.primary;

  return (
    <Animated.View style={[styles.tag, { borderColor: `${toneColor}88`, backgroundColor: `${toneColor}22` }, animatedStyle]}>
      <Text style={[styles.text, { color: toneColor }]}>{label}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  tag: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8
  },
  text: { fontSize: 13, fontWeight: "800" }
});

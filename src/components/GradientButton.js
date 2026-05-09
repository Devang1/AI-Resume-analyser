import { Pressable, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { gradients } from "../constants/theme";

export default function GradientButton({ title, icon: Icon, onPress, variant = "primary", style, disabled }) {
  const colors = variant === "danger" ? gradients.danger : gradients.primary;

  return (
    <Pressable
      disabled={disabled}
      onPress={(event) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onPress?.(event);
      }}
      style={({ pressed }) => [styles.pressable, pressed && styles.pressed, disabled && styles.disabled, style]}
    >
      <LinearGradient colors={colors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.gradient}>
        <View style={styles.row}>
          {Icon ? <Icon color="#fff" size={19} strokeWidth={2.5} /> : null}
          <Text style={styles.title}>{title}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressable: { borderRadius: 8 },
  gradient: {
    minHeight: 54,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18
  },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  title: { color: "#fff", fontSize: 16, fontWeight: "800" },
  pressed: { transform: [{ scale: 0.98 }], opacity: 0.9 },
  disabled: { opacity: 0.45 }
});

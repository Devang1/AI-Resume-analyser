import { Text, StyleSheet, View } from "react-native";
import { colors } from "../constants/theme";
import GlassCard from "./GlassCard";

export default function StatCard({ label, value, icon: Icon, accent = colors.primary }) {
  return (
    <GlassCard style={styles.card}>
      <View style={[styles.iconWrap, { backgroundColor: `${accent}24` }]}>
        <Icon color={accent} size={20} />
      </View>
      <Text style={styles.value} numberOfLines={1}>{value}</Text>
      <Text style={styles.label} numberOfLines={2}>{label}</Text>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { width: "48%", minHeight: 138, justifyContent: "space-between" },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  value: { color: colors.white, fontSize: 25, fontWeight: "900", marginTop: 16 },
  label: { color: colors.muted, fontSize: 13, lineHeight: 18, marginTop: 4 }
});

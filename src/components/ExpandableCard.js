import { useState } from "react";
import { LayoutAnimation, Platform, Pressable, StyleSheet, Text, UIManager, View } from "react-native";
import { ChevronDown } from "lucide-react-native";
import { colors } from "../constants/theme";
import GlassCard from "./GlassCard";

if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ExpandableCard({ title, detail }) {
  const [open, setOpen] = useState(false);

  return (
    <GlassCard style={styles.card}>
      <Pressable
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setOpen((value) => !value);
        }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <ChevronDown color={colors.mutedStrong} size={20} style={{ transform: [{ rotate: open ? "180deg" : "0deg" }] }} />
        </View>
        {open ? <Text style={styles.detail}>{detail}</Text> : null}
      </Pressable>
    </GlassCard>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 12, padding: 16 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12 },
  title: { color: colors.white, fontSize: 15, fontWeight: "800", flex: 1 },
  detail: { color: colors.mutedStrong, lineHeight: 22, marginTop: 12 }
});

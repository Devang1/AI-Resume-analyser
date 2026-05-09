import { Pressable, StyleSheet, Text, View } from "react-native";
import { FileText, Trash2 } from "lucide-react-native";
import { colors } from "../constants/theme";
import { formatDate } from "../utils/format";
import GlassCard from "./GlassCard";

export default function AnalysisListCard({ item, onPress, onDelete }) {
  return (
    <Pressable onPress={onPress}>
      <GlassCard style={styles.card}>
        <View style={styles.icon}>
          <FileText color={colors.cyan} size={22} />
        </View>
        <View style={styles.body}>
          <Text style={styles.name} numberOfLines={1}>{item.fileName}</Text>
          <Text style={styles.date}>{formatDate(item.createdAt)}</Text>
          <View style={styles.metaRow}>
            <Text style={styles.meta}>ATS {item.atsScore}%</Text>
            <Text style={styles.meta}>Match {item.skillMatch}%</Text>
          </View>
        </View>
        {onDelete ? (
          <Pressable hitSlop={10} onPress={onDelete} style={styles.delete}>
            <Trash2 color={colors.red} size={18} />
          </Pressable>
        ) : null}
      </GlassCard>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: "row", alignItems: "center", marginBottom: 12, padding: 14 },
  icon: {
    width: 46,
    height: 46,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(34,211,238,0.12)"
  },
  body: { flex: 1, marginLeft: 12 },
  name: { color: colors.white, fontSize: 15, fontWeight: "800" },
  date: { color: colors.muted, fontSize: 12, marginTop: 4 },
  metaRow: { flexDirection: "row", gap: 10, marginTop: 8 },
  meta: { color: colors.mutedStrong, fontSize: 12, fontWeight: "700" },
  delete: { padding: 8 }
});

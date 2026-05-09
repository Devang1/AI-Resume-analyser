import { StyleSheet, Text, View } from "react-native";
import { Crown, Medal, Sparkles, UserRound } from "lucide-react-native";
import GlassCard from "../components/GlassCard";
import Screen from "../components/Screen";
import StatCard from "../components/StatCard";
import { colors } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function ProfileScreen() {
  const { history } = useApp();
  const best = Math.max(...history.map((item) => item.atsScore), 0);

  return (
    <Screen>
      <GlassCard style={styles.hero}>
        <View style={styles.avatar}>
          <UserRound color={colors.white} size={44} />
        </View>
        <Text style={styles.name}>Career Pro</Text>
        <View style={styles.badge}>
          <Crown color={colors.yellow} size={16} />
          <Text style={styles.badgeText}>Premium AI insights</Text>
        </View>
      </GlassCard>
      <View style={styles.stats}>
        <StatCard label="Total resumes analyzed" value={history.length} icon={Sparkles} accent={colors.cyan} />
        <StatCard label="Best ATS score" value={`${best}%`} icon={Medal} accent={colors.yellow} />
      </View>
      <GlassCard style={styles.block}>
        <Text style={styles.sectionTitle}>Profile intelligence</Text>
        <Text style={styles.copy}>Your resume reports are stored locally on this device. Connect the Express backend with OpenAI to generate role-specific insights from extracted resume text.</Text>
      </GlassCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: "center", marginTop: 20, paddingVertical: 28 },
  avatar: { width: 86, height: 86, borderRadius: 43, backgroundColor: "rgba(99,102,241,0.35)", alignItems: "center", justifyContent: "center" },
  name: { color: colors.white, fontSize: 24, fontWeight: "900", marginTop: 16 },
  badge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "rgba(251,191,36,0.13)", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8, marginTop: 12 },
  badgeText: { color: colors.yellow, fontWeight: "900", fontSize: 12 },
  stats: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12, marginTop: 20 },
  block: { marginTop: 18 },
  sectionTitle: { color: colors.white, fontSize: 18, fontWeight: "900" },
  copy: { color: colors.mutedStrong, lineHeight: 22, marginTop: 10 }
});

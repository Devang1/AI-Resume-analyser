import { Pressable, StyleSheet, Switch, Text, View } from "react-native";
import { Bell, LogOut, Moon, Shield } from "lucide-react-native";
import GlassCard from "../components/GlassCard";
import Screen from "../components/Screen";
import { colors } from "../constants/theme";

export default function SettingsScreen() {
  return (
    <Screen>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.copy}>Tune the app experience and review privacy controls.</Text>
      <GlassCard style={styles.block}>
        <SettingRow icon={Moon} title="Dark mode" control={<Switch value trackColor={{ true: colors.primary }} thumbColor={colors.white} />} />
        <SettingRow icon={Bell} title="Notifications" control={<Switch value={false} trackColor={{ true: colors.primary }} thumbColor={colors.white} />} />
      </GlassCard>
      <GlassCard style={styles.block}>
        <SettingRow icon={Shield} title="Privacy policy" />
        <SettingRow icon={LogOut} title="Logout" danger />
      </GlassCard>
    </Screen>
  );
}

function SettingRow({ icon: Icon, title, control, danger }) {
  return (
    <Pressable style={styles.row}>
      <View style={[styles.rowIcon, danger && styles.dangerIcon]}>
        <Icon color={danger ? colors.red : colors.cyan} size={19} />
      </View>
      <Text style={[styles.rowTitle, danger && styles.dangerText]}>{title}</Text>
      {control || <Text style={styles.chevron}>›</Text>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.white, fontSize: 32, fontWeight: "900", marginTop: 18 },
  copy: { color: colors.mutedStrong, fontSize: 15, lineHeight: 23, marginTop: 10, marginBottom: 22 },
  block: { marginBottom: 16, paddingVertical: 6 },
  row: { minHeight: 60, flexDirection: "row", alignItems: "center" },
  rowIcon: { width: 38, height: 38, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(34,211,238,0.12)" },
  dangerIcon: { backgroundColor: "rgba(251,113,133,0.12)" },
  rowTitle: { flex: 1, color: colors.white, fontSize: 16, fontWeight: "800", marginLeft: 12 },
  dangerText: { color: colors.red },
  chevron: { color: colors.muted, fontSize: 28 }
});

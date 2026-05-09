import { Dimensions, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Award, FileUp, Sparkles, TrendingUp } from "lucide-react-native";
import { LineChart } from "react-native-chart-kit";
import GradientButton from "../components/GradientButton";
import Screen from "../components/Screen";
import StatCard from "../components/StatCard";
import AnalysisListCard from "../components/AnalysisListCard";
import GlassCard from "../components/GlassCard";
import { colors } from "../constants/theme";
import { averageScore } from "../utils/format";
import { useApp } from "../context/AppContext";
import { useEntranceAnimation } from "../hooks/useEntranceAnimation";

export default function HomeScreen({ navigation }) {
  const { history, refreshHistory, setCurrentAnalysis } = useApp();
  const average = averageScore(history);
  const best = history.reduce((top, item) => (item.atsScore > top.atsScore ? item : top), history[0] || { atsScore: 0, strongestSkill: "React" });
  const chartStyle = useEntranceAnimation(100);
  const chartWidth = Math.min(Dimensions.get("window").width - 72, 340);

  return (
    <Screen
      contentStyle={styles.content}
      refreshControl={<RefreshControl tintColor={colors.primary} refreshing={false} onRefresh={refreshHistory} />}
    >
      <Text style={styles.kicker}>Welcome back</Text>
      <Text style={styles.title}>Ready to sharpen your next application?</Text>
      <GradientButton title="Upload Resume" icon={FileUp} onPress={() => navigation.navigate("Upload")} style={styles.uploadButton} />

      <View style={styles.stats}>
        <StatCard label="Total resumes analyzed" value={history.length} icon={FileUp} accent={colors.cyan} />
        <StatCard label="Average ATS score" value={`${average}%`} icon={TrendingUp} accent={colors.green} />
        <StatCard label="Strongest skill" value={best.strongestSkill || "React"} icon={Award} accent={colors.yellow} />
        <StatCard label="Improvement lift" value={`${best.improvementPercentage || 24}%`} icon={Sparkles} accent={colors.accent} />
      </View>

      <GlassCard animatedStyle={chartStyle} style={styles.chartCard}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>ATS trend</Text>
          <Text style={styles.sectionMeta}>Last reports</Text>
        </View>
        <LineChart
          data={{
            labels: history.slice(0, 4).map((_, index) => `R${index + 1}`).reverse(),
            datasets: [{ data: history.slice(0, 4).map((item) => item.atsScore).reverse() }]
          }}
          width={chartWidth}
          height={188}
          yAxisSuffix="%"
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
            labelColor: () => colors.muted,
            propsForDots: { r: "5", strokeWidth: "2", stroke: colors.cyan },
            propsForBackgroundLines: { stroke: "rgba(255,255,255,0.08)" },
            decimalPlaces: 0
          }}
          bezier
          style={styles.chart}
        />
      </GlassCard>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Previous analyses</Text>
        <Text style={styles.sectionMeta}>{history.length} saved</Text>
      </View>
      {history.slice(0, 3).map((item) => (
        <AnalysisListCard
          key={item.id}
          item={item}
          onPress={() => {
            setCurrentAnalysis(item);
            navigation.navigate("Results", { analysisId: item.id });
          }}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 14 },
  kicker: { color: colors.cyan, fontSize: 13, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0 },
  title: { color: colors.white, fontSize: 32, lineHeight: 38, fontWeight: "900", marginTop: 10 },
  uploadButton: { marginTop: 24 },
  stats: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 12, marginTop: 24 },
  chartCard: { marginTop: 22, padding: 16 },
  chart: { marginTop: 10, marginLeft: -20 },
  sectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 26, marginBottom: 12 },
  sectionTitle: { color: colors.white, fontSize: 19, fontWeight: "900" },
  sectionMeta: { color: colors.muted, fontSize: 13, fontWeight: "700" }
});

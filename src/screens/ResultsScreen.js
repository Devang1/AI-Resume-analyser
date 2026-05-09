import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { ArrowLeft, BriefcaseBusiness, CheckCircle2, Lightbulb, XCircle } from "lucide-react-native";
import { BarChart } from "react-native-chart-kit";
import AnimatedScoreRing from "../components/AnimatedScoreRing";
import ExpandableCard from "../components/ExpandableCard";
import GlassCard from "../components/GlassCard";
import Screen from "../components/Screen";
import SkillTag from "../components/SkillTag";
import { colors } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function ResultsScreen({ navigation, route }) {
  const { history, currentAnalysis } = useApp();
  const analysis = currentAnalysis || history.find((item) => item.id === route.params?.analysisId) || history[0];
  const chartWidth = Math.min(Dimensions.get("window").width - 72, 340);

  if (!analysis) {
    return (
      <Screen>
        <Text style={styles.title}>No analysis found</Text>
      </Screen>
    );
  }

  const skillValues = Object.values(analysis.skillBreakdown);

  return (
    <Screen>
      <Pressable onPress={() => navigation.navigate("Tabs")} style={styles.back}>
        <ArrowLeft color={colors.white} size={23} />
      </Pressable>
      <Text style={styles.kicker}>Resume report</Text>
      <Text style={styles.title}>{analysis.fileName}</Text>

      <GlassCard style={styles.scoreCard}>
        <AnimatedScoreRing score={analysis.atsScore} />
        <View style={styles.scoreCopy}>
          <Text style={styles.scoreTitle}>Strong ATS compatibility</Text>
          <Text style={styles.scoreText}>Hiring probability is estimated at {analysis.hiringProbability}% with a {analysis.skillMatch}% skill match.</Text>
        </View>
      </GlassCard>

      <Section title="Resume strength" icon={CheckCircle2} items={analysis.strengths} tone={colors.green} />
      <Section title="Weak areas" icon={XCircle} items={analysis.weaknesses} tone={colors.red} />

      <GlassCard style={styles.block}>
        <View style={styles.sectionHeader}>
          <BriefcaseBusiness color={colors.yellow} size={21} />
          <Text style={styles.sectionTitle}>Missing skills</Text>
        </View>
        <View style={styles.tags}>
          {analysis.missingSkills.map((skill, index) => <SkillTag key={skill} label={skill} tone="warning" index={index} />)}
        </View>
      </GlassCard>

      <GlassCard style={styles.block}>
        <Text style={styles.sectionTitle}>Skill match chart</Text>
        <BarChart
          data={{
            labels: ["FE", "BE", "AI", "Comms", "Lead"],
            datasets: [{ data: skillValues }]
          }}
          width={chartWidth}
          height={220}
          yAxisSuffix="%"
          fromZero
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
            labelColor: () => colors.mutedStrong,
            propsForBackgroundLines: { stroke: "rgba(255,255,255,0.08)" },
            barPercentage: 0.62,
            decimalPlaces: 0
          }}
          style={styles.chart}
        />
      </GlassCard>

      <View style={styles.sectionHeaderLoose}>
        <Lightbulb color={colors.cyan} size={21} />
        <Text style={styles.sectionTitle}>AI suggestions</Text>
      </View>
      {analysis.suggestions.map((suggestion) => (
        <ExpandableCard key={suggestion.title} title={suggestion.title} detail={suggestion.detail} />
      ))}

      <GlassCard style={styles.block}>
        <Text style={styles.sectionTitle}>Keyword optimization</Text>
        <KeywordGroup title="Strong" tone="success" items={analysis.keywordFeedback.strong} />
        <KeywordGroup title="Moderate" tone="warning" items={analysis.keywordFeedback.moderate} />
        <KeywordGroup title="Missing" tone="danger" items={analysis.keywordFeedback.missing} />
      </GlassCard>
    </Screen>
  );
}

function Section({ title, icon: Icon, items, tone }) {
  return (
    <GlassCard style={styles.block}>
      <View style={styles.sectionHeader}>
        <Icon color={tone} size={21} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <View style={[styles.bullet, { backgroundColor: tone }]} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </GlassCard>
  );
}

function KeywordGroup({ title, items, tone }) {
  return (
    <View style={styles.keywordGroup}>
      <Text style={styles.keywordTitle}>{title}</Text>
      <View style={styles.tags}>{items.map((item, index) => <SkillTag key={item} label={item} tone={tone} index={index} />)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  back: { width: 42, height: 42, alignItems: "center", justifyContent: "center", marginTop: 8 },
  kicker: { color: colors.cyan, fontSize: 13, fontWeight: "900", textTransform: "uppercase", letterSpacing: 0, marginTop: 8 },
  title: { color: colors.white, fontSize: 28, lineHeight: 34, fontWeight: "900", marginTop: 8 },
  scoreCard: { marginTop: 22, alignItems: "center" },
  scoreCopy: { marginTop: 18, alignItems: "center" },
  scoreTitle: { color: colors.white, fontSize: 20, fontWeight: "900" },
  scoreText: { color: colors.mutedStrong, lineHeight: 22, textAlign: "center", marginTop: 8 },
  block: { marginTop: 16 },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 12 },
  sectionHeaderLoose: { flexDirection: "row", alignItems: "center", gap: 10, marginTop: 24, marginBottom: 12 },
  sectionTitle: { color: colors.white, fontSize: 18, fontWeight: "900" },
  bulletRow: { flexDirection: "row", alignItems: "flex-start", marginTop: 10 },
  bullet: { width: 8, height: 8, borderRadius: 4, marginTop: 7, marginRight: 10 },
  bulletText: { color: colors.mutedStrong, flex: 1, lineHeight: 22 },
  tags: { flexDirection: "row", flexWrap: "wrap", marginTop: 4 },
  chart: { marginTop: 12, marginLeft: -22 },
  keywordGroup: { marginTop: 16 },
  keywordTitle: { color: colors.mutedStrong, fontWeight: "900", marginBottom: 8 }
});

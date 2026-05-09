import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { BrainCircuit, ScanLine } from "lucide-react-native";
import LottieView from "lottie-react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import Screen from "../components/Screen";
import ShimmerSkeleton from "../components/ShimmerSkeleton";
import { colors } from "../constants/theme";
import { analyzeResume } from "../services/api";
import { useApp } from "../context/AppContext";

const logs = [
  "Analyzing formatting...",
  "Checking ATS compatibility...",
  "Detecting missing keywords...",
  "Evaluating project descriptions...",
  "Scoring skill alignment...",
  "Generating recruiter suggestions..."
];

export default function LoadingAnalysisScreen({ navigation, route }) {
  const { file } = route.params || {};
  const { persistAnalysis } = useApp();
  const [activeLog, setActiveLog] = useState(0);
  const hasStarted = useRef(false);
  const rotate = useSharedValue(0);
  const scan = useSharedValue(0);

  useEffect(() => {
    rotate.value = withRepeat(withTiming(360, { duration: 1800 }), -1, false);
    scan.value = withRepeat(withTiming(1, { duration: 1400 }), -1, true);
  }, [rotate, scan]);

  useEffect(() => {
    const interval = setInterval(() => setActiveLog((value) => Math.min(value + 1, logs.length - 1)), 850);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    const run = async () => {
      try {
        const analysis = await analyzeResume({
          fileName: file?.name || "Uploaded_Resume.pdf",
          resumeText: "PDF text extraction can be connected here. This premium demo sends structured placeholder text to the backend."
        });
        await new Promise((resolve) => setTimeout(resolve, 4200));
        await persistAnalysis(analysis);
        navigation.replace("Results", { analysisId: analysis.id });
      } catch (_error) {
        navigation.replace("Tabs");
      }
    };
    run();
  }, [file, navigation, persistAnalysis]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotate.value}deg` }]
  }));

  const scanStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scan.value * 168 }]
  }));

  return (
    <Screen scroll={false} contentStyle={styles.root}>
      <View style={styles.scanner}>
        <LottieView source={require("../assets/ai-scan.json")} autoPlay loop style={styles.lottie} />
        <Animated.View style={[styles.ring, ringStyle]} />
        <BrainCircuit color={colors.white} size={62} />
        <Animated.View style={[styles.scanLine, scanStyle]}>
          <ScanLine color={colors.cyan} size={230} strokeWidth={1} />
        </Animated.View>
      </View>
      <Text style={styles.title}>AI analysis in progress</Text>
      <Text style={styles.copy}>Reading structure, keywords, skills, and hiring signals.</Text>
      <View style={styles.logs}>
        {logs.map((log, index) => (
          <View key={log} style={[styles.logRow, index <= activeLog && styles.logActive]}>
            <View style={[styles.logDot, index <= activeLog && styles.logDotActive]} />
            <Text style={[styles.logText, index <= activeLog && styles.logTextActive]}>{log}</Text>
          </View>
        ))}
      </View>
      <View style={styles.skeletons}>
        <ShimmerSkeleton height={14} width="82%" />
        <ShimmerSkeleton height={14} width="64%" style={styles.skeleton} />
        <ShimmerSkeleton height={14} width="72%" style={styles.skeleton} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, alignItems: "center", justifyContent: "center", paddingHorizontal: 24 },
  scanner: {
    width: 230,
    height: 230,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)"
  },
  lottie: { position: "absolute", width: 240, height: 240 },
  ring: {
    position: "absolute",
    width: 188,
    height: 188,
    borderRadius: 94,
    borderWidth: 2,
    borderTopColor: colors.cyan,
    borderRightColor: "transparent",
    borderBottomColor: colors.primary,
    borderLeftColor: "transparent"
  },
  scanLine: { position: "absolute", top: 20, opacity: 0.55 },
  title: { color: colors.white, fontSize: 28, lineHeight: 34, fontWeight: "900", marginTop: 34, textAlign: "center" },
  copy: { color: colors.mutedStrong, textAlign: "center", marginTop: 10, lineHeight: 22 },
  logs: { alignSelf: "stretch", marginTop: 30, gap: 10 },
  logRow: { flexDirection: "row", alignItems: "center", opacity: 0.42 },
  logActive: { opacity: 1 },
  logDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.muted, marginRight: 10 },
  logDotActive: { backgroundColor: colors.green },
  logText: { color: colors.muted, fontWeight: "700" },
  logTextActive: { color: colors.white },
  skeletons: { alignSelf: "stretch", marginTop: 30 },
  skeleton: { marginTop: 10 }
});

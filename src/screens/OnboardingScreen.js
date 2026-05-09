import { useRef, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Bot, ChartNoAxesCombined, Sparkles } from "lucide-react-native";
import { setOnboardingComplete } from "../utils/storage";
import GradientButton from "../components/GradientButton";
import Screen from "../components/Screen";
import { colors } from "../constants/theme";

const { width } = Dimensions.get("window");

const pages = [
  { title: "Analyze your resume instantly", copy: "Upload a PDF and get a recruiter-grade read on structure, clarity, and match quality.", Icon: Bot },
  { title: "Get ATS optimization suggestions", copy: "Find missing keywords, weak sections, repeated terms, and formatting issues before applying.", Icon: ChartNoAxesCombined },
  { title: "Improve hiring chances with AI", copy: "Turn vague bullets into measurable achievements and sharpen your profile for each role.", Icon: Sparkles }
];

export default function OnboardingScreen({ onDone }) {
  const [index, setIndex] = useState(0);
  const listRef = useRef(null);

  const finish = async () => {
    await setOnboardingComplete();
    onDone();
  };

  const next = () => {
    if (index === pages.length - 1) return finish();
    listRef.current?.scrollToIndex({ index: index + 1 });
  };

  return (
    <Screen scroll={false} contentStyle={styles.root}>
      <Pressable onPress={finish} style={styles.skip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
      <FlatList
        ref={listRef}
        data={pages}
        keyExtractor={(item) => item.title}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => setIndex(Math.round(event.nativeEvent.contentOffset.x / width))}
        renderItem={({ item }) => (
          <View style={styles.page}>
            <View style={styles.illustration}>
              <item.Icon color={colors.white} size={86} strokeWidth={1.5} />
              <View style={styles.orbitOne} />
              <View style={styles.orbitTwo} />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.copy}>{item.copy}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.dots}>
          {pages.map((page, pageIndex) => (
            <View key={page.title} style={[styles.dot, pageIndex === index && styles.activeDot]} />
          ))}
        </View>
        <GradientButton title={index === pages.length - 1 ? "Start analyzing" : "Next"} onPress={next} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  skip: { position: "absolute", top: 58, right: 22, zIndex: 10, padding: 8 },
  skipText: { color: colors.mutedStrong, fontWeight: "800" },
  page: { width, alignItems: "center", justifyContent: "center", paddingHorizontal: 28 },
  illustration: {
    width: 220,
    height: 220,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.07)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)"
  },
  orbitOne: { position: "absolute", width: 156, height: 156, borderRadius: 78, borderWidth: 1, borderColor: "rgba(99,102,241,0.45)" },
  orbitTwo: { position: "absolute", width: 116, height: 116, borderRadius: 58, borderWidth: 1, borderColor: "rgba(139,92,246,0.55)" },
  title: { color: colors.white, fontSize: 34, lineHeight: 40, textAlign: "center", fontWeight: "900", marginTop: 38 },
  copy: { color: colors.mutedStrong, fontSize: 16, lineHeight: 24, textAlign: "center", marginTop: 14 },
  footer: { paddingHorizontal: 24, paddingBottom: 34 },
  dots: { flexDirection: "row", justifyContent: "center", gap: 8, marginBottom: 24 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.24)" },
  activeDot: { width: 26, backgroundColor: colors.primary }
});

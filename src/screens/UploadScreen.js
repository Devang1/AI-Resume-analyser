import { useEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { ArrowLeft, FileText, Trash2, UploadCloud } from "lucide-react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import GradientButton from "../components/GradientButton";
import GlassCard from "../components/GlassCard";
import Screen from "../components/Screen";
import { colors } from "../constants/theme";

export default function UploadScreen({ navigation }) {
  const [file, setFile] = useState(null);
  const glow = useSharedValue(0.35);

  useEffect(() => {
    glow.value = withRepeat(withSequence(withTiming(1, { duration: 1300 }), withTiming(0.35, { duration: 1300 })), -1, true);
  }, [glow]);
  const animatedBorder = useAnimatedStyle(() => ({
    borderColor: `rgba(99,102,241,${glow.value})`
  }));

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true
    });

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const analyze = () => {
    if (!file) {
      Alert.alert("Resume required", "Choose a PDF resume before starting the AI analysis.");
      return;
    }
    navigation.navigate("LoadingAnalysis", { file });
  };

  return (
    <Screen>
      <Pressable onPress={() => navigation.goBack()} style={styles.back}>
        <ArrowLeft color={colors.white} size={23} />
      </Pressable>
      <Text style={styles.title}>Upload resume</Text>
      <Text style={styles.copy}>Send your PDF through an ATS, keyword, and hiring-signal analysis pipeline.</Text>

      <Pressable onPress={pickFile}>
        <Animated.View style={[styles.uploadCard, animatedBorder]}>
          <UploadCloud color={colors.cyan} size={56} strokeWidth={1.6} />
          <Text style={styles.uploadTitle}>Choose PDF resume</Text>
          <Text style={styles.uploadCopy}>Tap to browse files. PDF resumes work best for ATS scoring.</Text>
        </Animated.View>
      </Pressable>

      {file ? (
        <GlassCard style={styles.fileCard}>
          <View style={styles.pdfIcon}>
            <FileText color={colors.red} size={24} />
          </View>
          <View style={styles.fileBody}>
            <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
            <Text style={styles.fileMeta}>{Math.max(1, Math.round((file.size || 0) / 1024))} KB PDF selected</Text>
          </View>
          <Pressable onPress={() => setFile(null)} hitSlop={10}>
            <Trash2 color={colors.red} size={20} />
          </Pressable>
        </GlassCard>
      ) : null}

      <GradientButton title="Start AI Analysis" icon={FileText} onPress={analyze} style={styles.cta} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  back: { width: 42, height: 42, alignItems: "center", justifyContent: "center", marginTop: 8 },
  title: { color: colors.white, fontSize: 34, fontWeight: "900", marginTop: 12 },
  copy: { color: colors.mutedStrong, fontSize: 15, lineHeight: 23, marginTop: 10 },
  uploadCard: {
    marginTop: 32,
    minHeight: 260,
    borderRadius: 8,
    borderWidth: 1.5,
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(255,255,255,0.06)"
  },
  uploadTitle: { color: colors.white, fontSize: 21, fontWeight: "900", marginTop: 18 },
  uploadCopy: { color: colors.muted, textAlign: "center", lineHeight: 21, marginTop: 8 },
  fileCard: { flexDirection: "row", alignItems: "center", marginTop: 18 },
  pdfIcon: { width: 44, height: 44, borderRadius: 8, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(251,113,133,0.12)" },
  fileBody: { flex: 1, marginLeft: 12 },
  fileName: { color: colors.white, fontWeight: "900", fontSize: 15 },
  fileMeta: { color: colors.muted, marginTop: 4, fontSize: 12 },
  cta: { marginTop: 26 }
});

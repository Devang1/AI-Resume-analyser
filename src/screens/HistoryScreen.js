import { Alert, RefreshControl, StyleSheet, Text } from "react-native";
import AnalysisListCard from "../components/AnalysisListCard";
import Screen from "../components/Screen";
import { colors } from "../constants/theme";
import { useApp } from "../context/AppContext";

export default function HistoryScreen({ navigation }) {
  const { history, refreshHistory, removeAnalysis, setCurrentAnalysis } = useApp();

  return (
    <Screen refreshControl={<RefreshControl tintColor={colors.primary} refreshing={false} onRefresh={refreshHistory} />}>
      <Text style={styles.title}>Analysis history</Text>
      <Text style={styles.copy}>Re-open reports, compare progress, and clear older resume scans.</Text>
      {history.map((item) => (
        <AnalysisListCard
          key={item.id}
          item={item}
          onPress={() => {
            setCurrentAnalysis(item);
            navigation.navigate("Results", { analysisId: item.id });
          }}
          onDelete={() => {
            Alert.alert("Delete report?", "This removes the saved analysis from local history.", [
              { text: "Cancel", style: "cancel" },
              { text: "Delete", style: "destructive", onPress: () => removeAnalysis(item.id) }
            ]);
          }}
        />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.white, fontSize: 32, fontWeight: "900", marginTop: 18 },
  copy: { color: colors.mutedStrong, fontSize: 15, lineHeight: 23, marginTop: 10, marginBottom: 22 }
});

import { ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { gradients, spacing } from "../constants/theme";

export default function Screen({ children, scroll = true, contentStyle, edges = ["top"], refreshControl }) {
  const Container = scroll ? ScrollView : View;

  return (
    <LinearGradient colors={gradients.background} style={styles.root}>
      <SafeAreaView edges={edges} style={styles.safe}>
        <Container
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
          contentContainerStyle={scroll ? [styles.content, contentStyle] : undefined}
          style={!scroll ? [styles.flex, contentStyle] : undefined}
        >
          {children}
        </Container>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  safe: { flex: 1 },
  flex: { flex: 1 },
  content: {
    paddingHorizontal: spacing.screen,
    paddingBottom: 120
  }
});

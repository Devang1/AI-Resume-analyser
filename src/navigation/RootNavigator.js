import { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BarChart3, Home, Settings, UserRound } from "lucide-react-native";
import { colors } from "../constants/theme";
import { isOnboardingComplete } from "../utils/storage";
import SplashScreen from "../screens/SplashScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import HomeScreen from "../screens/HomeScreen";
import UploadScreen from "../screens/UploadScreen";
import LoadingAnalysisScreen from "../screens/LoadingAnalysisScreen";
import ResultsScreen from "../screens/ResultsScreen";
import HistoryScreen from "../screens/HistoryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          margin: 16,
          height: 68,
          borderRadius: 8,
          backgroundColor: "rgba(15,23,42,0.92)",
          borderColor: "rgba(255,255,255,0.10)"
        },
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: "700", marginBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          const icons = { Home: Home, History: BarChart3, Profile: UserRound, Settings: Settings };
          const Icon = icons[route.name];
          return <Icon color={color} size={size} />;
        }
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const [booted, setBooted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fallback = setTimeout(() => {
      if (mounted) setShowOnboarding(true);
    }, 1200);

    isOnboardingComplete()
      .then((complete) => {
        if (mounted) setShowOnboarding(!complete);
      })
      .catch(() => {
        if (mounted) setShowOnboarding(true);
      })
      .finally(() => clearTimeout(fallback));

    return () => {
      mounted = false;
      clearTimeout(fallback);
    };
  }, []);

  if (!booted) {
    return <SplashScreen onDone={() => setBooted(true)} />;
  }

  if (showOnboarding) {
    return <OnboardingScreen onDone={() => setShowOnboarding(false)} />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: "slide_from_right", contentStyle: { backgroundColor: colors.background } }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Upload" component={UploadScreen} />
      <Stack.Screen name="LoadingAnalysis" component={LoadingAnalysisScreen} />
      <Stack.Screen name="Results" component={ResultsScreen} />
    </Stack.Navigator>
  );
}

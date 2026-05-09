import AsyncStorage from "@react-native-async-storage/async-storage";
import { sampleAnalyses } from "../constants/mockData";

const HISTORY_KEY = "ai-resume-analyzer:history";
const ONBOARDING_KEY = "ai-resume-analyzer:onboarding-complete";

export async function getHistory() {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : sampleAnalyses;
}

export async function saveHistory(items) {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(items));
}

export async function addAnalysis(item) {
  const history = await getHistory();
  const next = [item, ...history.filter((entry) => entry.id !== item.id)];
  await saveHistory(next);
  return next;
}

export async function deleteAnalysis(id) {
  const history = await getHistory();
  const next = history.filter((entry) => entry.id !== id);
  await saveHistory(next);
  return next;
}

export async function isOnboardingComplete() {
  return (await AsyncStorage.getItem(ONBOARDING_KEY)) === "true";
}

export async function setOnboardingComplete() {
  await AsyncStorage.setItem(ONBOARDING_KEY, "true");
}

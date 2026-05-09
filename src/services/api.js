import axios from "axios";
import { createAnalysisFromFile } from "../constants/mockData";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";

export async function analyzeResume({ resumeText, fileName }) {
  try {
    const { data } = await axios.post(`${API_URL}/analyze-resume`, {
      resumeText,
      fileName
    });

    return {
      ...createAnalysisFromFile(fileName),
      ...data,
      fileName,
      id: `analysis-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
  } catch (_error) {
    return createAnalysisFromFile(fileName);
  }
}

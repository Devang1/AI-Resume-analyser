import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addAnalysis, deleteAnalysis, getHistory } from "../utils/storage";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    getHistory()
      .then(setHistory)
      .finally(() => setIsHydrated(true));
  }, []);

  const value = useMemo(
    () => ({
      history,
      currentAnalysis,
      isHydrated,
      setCurrentAnalysis,
      refreshHistory: async () => setHistory(await getHistory()),
      persistAnalysis: async (analysis) => {
        setCurrentAnalysis(analysis);
        setHistory(await addAnalysis(analysis));
      },
      removeAnalysis: async (id) => {
        setHistory(await deleteAnalysis(id));
      }
    }),
    [history, currentAnalysis, isHydrated]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const value = useContext(AppContext);
  if (!value) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return value;
}

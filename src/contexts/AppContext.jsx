import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext(null);

const CONFIG_STORAGE_KEY = 'sf-config';
const DARK_MODE_STORAGE_KEY = 'sf-dark-mode';
const SIDEBAR_STORAGE_KEY = 'sf-desktop-sidebar-open';
const DEFAULT_CONFIG = {
  refreshInterval: 10000,
};

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage failures so monitoring can keep running.
  }
}

function getInitialConfig() {
  const saved = readStorage(CONFIG_STORAGE_KEY, {});
  const refreshInterval = Number(saved?.refreshInterval);

  return {
    ...DEFAULT_CONFIG,
    ...saved,
    refreshInterval: Number.isFinite(refreshInterval)
      ? Math.max(5000, Math.min(60000, refreshInterval))
      : DEFAULT_CONFIG.refreshInterval,
  };
}

function isSameReading(a, b) {
  if (!a || !b) return false;

  return (
    a.temperature === b.temperature &&
    a.humidity === b.humidity &&
    a.dewPoint === b.dewPoint &&
    a.tempDewDiff === b.tempDewDiff &&
    a.riskScore === b.riskScore &&
    a.status === b.status &&
    a.recommendation === b.recommendation &&
    a.uptime === b.uptime
  );
}

export function AppProvider({ children }) {
  const [current, setCurrent] = useState(null);
  const [history, setHistoryState] = useState([]);
  const [transitions, setTransitions] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(() => readStorage(DARK_MODE_STORAGE_KEY, false));
  const [config, setConfigState] = useState(getInitialConfig);
  const [desktopSidebarOpen, setDesktopSidebarOpenState] = useState(() => readStorage(SIDEBAR_STORAGE_KEY, true));
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const setHistory = useCallback((updater) => {
    setHistoryState((prev) => {
      const nextValue = typeof updater === 'function' ? updater(prev) : updater;
      return Array.isArray(nextValue) ? nextValue : [];
    });
  }, []);

  const setDesktopSidebarOpen = useCallback((updater) => {
    setDesktopSidebarOpenState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      writeStorage(SIDEBAR_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => {
      const next = !prev;
      writeStorage(DARK_MODE_STORAGE_KEY, next);
      return next;
    });
  }, []);

  const toggleDesktopSidebar = useCallback(() => {
    setDesktopSidebarOpen((prev) => !prev);
  }, [setDesktopSidebarOpen]);

  const toggleMobileSidebar = useCallback(() => {
    setMobileSidebarOpen((prev) => !prev);
  }, []);

  const closeMobileSidebar = useCallback(() => {
    setMobileSidebarOpen(false);
  }, []);

  const updateConfig = useCallback((updates) => {
    setConfigState((prev) => {
      const next = { ...prev, ...updates };
      const refreshInterval = Number(next.refreshInterval);
      const normalized = {
        ...next,
        refreshInterval: Number.isFinite(refreshInterval)
          ? Math.max(5000, Math.min(60000, refreshInterval))
          : DEFAULT_CONFIG.refreshInterval,
      };

      writeStorage(CONFIG_STORAGE_KEY, normalized);
      return normalized;
    });
  }, []);

  const addToHistory = useCallback(
    (reading) => {
      setHistory((prev) => {
        if (isSameReading(prev[0], reading)) return prev;
        return [reading, ...prev];
      });
    },
    [setHistory]
  );

  const addTransition = useCallback(
    (prevStatus, newStatus, timestamp) => {
      setTransitions((prev) => {
        const next = [{ prevStatus, newStatus, timestamp }, ...prev];
        return next.slice(0, 50);
      });
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        current,
        setCurrent,
        history,
        setHistory,
        transitions,
        addTransition,
        isConnected,
        setIsConnected,
        isLoading,
        setIsLoading,
        error,
        setError,
        darkMode,
        toggleDarkMode,
        config,
        updateConfig,
        addToHistory,
        desktopSidebarOpen,
        setDesktopSidebarOpen,
        toggleDesktopSidebar,
        mobileSidebarOpen,
        toggleMobileSidebar,
        closeMobileSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

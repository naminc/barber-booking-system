import { createContext, useContext, useState, useEffect } from "react";
import settingsApi from "../api/settingsApi";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const data = await settingsApi.getSettings();
      setSettings(data || {});
      setError(null);
    } catch (err) {
      setSettings({});
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings) => {
    try {
      const updated = await settingsApi.updateSettings(newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  const getSetting = (key, defaultValue = null) => {
    return settings?.[key] ?? defaultValue;
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const value = {
    settings,
    loading,
    error,
    fetchSettings,
    updateSettings,
    getSetting,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within SettingsProvider");
  }
  return context;
}
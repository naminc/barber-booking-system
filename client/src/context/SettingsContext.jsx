import { createContext, useContext, useState, useEffect } from "react";
import settingsApi from "../api/settingsApi";

const SettingsContext = createContext();

// Provider cho context settings
export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lấy cấu hình
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

  // Cập nhật cấu hình
  const updateSettings = async (newSettings) => {
    try {
      const updated = await settingsApi.updateSettings(newSettings);
      setSettings(updated);
      return updated;
    } catch (err) {
      throw err;
    }
  };

  // Lấy giá trị của cấu hình
  const getSetting = (key, defaultValue = null) => {
    return settings?.[key] ?? defaultValue;
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Giá trị của context
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

// Hook để sử dụng context
export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettingsContext must be used within SettingsProvider");
  }
  return context;
}
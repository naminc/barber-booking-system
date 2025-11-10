import { useEffect } from "react";
import { useSettingsContext } from "../context/SettingsContext";

// Hook để set document title
export function usePageTitle(pageTitle, includeShopName = true) {
  const { getSetting } = useSettingsContext();

  useEffect(() => {
    // Lấy title từ settings
    const shopTitle = getSetting("title", "NAMINC BARBER");
    
    if (includeShopName && pageTitle) {
      document.title = `${pageTitle} - ${shopTitle}`;
    } else if (pageTitle) {
      document.title = pageTitle;
    } else {
      document.title = shopTitle;
    }

    // Cleanup: Khôi phục title mặc định khi component unmount
    return () => {
      document.title = shopTitle;
    };
  }, [pageTitle, includeShopName, getSetting]);
}


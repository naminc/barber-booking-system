import { useEffect } from "react";
import { useSettingsContext } from "../context/SettingsContext";

/**
 * Custom hook để set document title
 * @param {string} pageTitle - Tiêu đề trang (VD: "Đặt lịch", "Dịch vụ")
 * @param {boolean} includeShopName - Có thêm tên shop vào title không
 * 
 * @example
 * usePageTitle("Đặt lịch"); // → "Đặt lịch - NAMINC BARBER"
 * usePageTitle("Trang chủ", false); // → "Trang chủ"
 */
export function usePageTitle(pageTitle, includeShopName = true) {
  const { getSetting } = useSettingsContext();

  useEffect(() => {
    // Lấy title từ settings (field "title" trong database)
    const shopTitle = getSetting("title", "NAMINC BARBER");
    
    if (includeShopName && pageTitle) {
      document.title = `${pageTitle} - ${shopTitle}`;
    } else if (pageTitle) {
      document.title = pageTitle;
    } else {
      document.title = shopTitle;
    }

    // Cleanup: Restore default title when component unmounts
    return () => {
      document.title = shopTitle;
    };
  }, [pageTitle, includeShopName, getSetting]);
}


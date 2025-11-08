import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/jwt";


export const useTokenExpiration = (checkInterval = 30000) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = localStorage.getItem("token");
      
      if (token && isTokenExpired(token)) {
        // Token expired, clear and logout
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Only redirect if not already on login page
        if (window.location.pathname !== "/login") {
          navigate("/login", { replace: true });
        }
      }
    };

    // Check immediately
    checkTokenExpiration();

    // Set up interval to check periodically
    const interval = setInterval(checkTokenExpiration, checkInterval);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, [navigate, checkInterval]);
};

export default useTokenExpiration;


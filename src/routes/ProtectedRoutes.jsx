import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findCookieJwt } from "../services/auth/findCookieJwt";

export function ProtectedRoute({ children }) {
  const navigateTo = useNavigate();

  useEffect(() => {
    const user = findCookieJwt();
    if (!user?.roles?.includes("Admin")) {
      navigateTo("/");
    }
  }, []);
  
  return <>{children}</>;
}

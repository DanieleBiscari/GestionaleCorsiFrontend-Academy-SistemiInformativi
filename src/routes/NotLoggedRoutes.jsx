import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findCookieJwt } from "../services/auth/findCookieJwt";

export function NotLoggedRoutes({ children }) {
  const navigateTo = useNavigate();

  useEffect(() => {
    const data = findCookieJwt()
    if (data) {
      navigateTo("/");
    }
  }, []);
  
  return <>{children}</>;
}
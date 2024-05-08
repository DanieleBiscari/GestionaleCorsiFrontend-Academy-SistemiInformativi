import {  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { findCookieJwt } from "../services/auth/findCookieJwt";

export function LoggedRoutes({ children }) {
  const navigateTo = useNavigate();

  useEffect(() => {
    const user = findCookieJwt();
    if (!user) {
      navigateTo("/");
    }
  }, []);
  
  return <>{children}</>;
}

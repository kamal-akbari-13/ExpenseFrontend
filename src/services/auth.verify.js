import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import AuthService from "./auth.service";

const parseJwt = (token) => {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    return JSON.parse(atob(parts[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props) => {
  let location = useLocation();

  useEffect(() => {
    // Clear any invalid tokens first
    AuthService.clearInvalidTokens();
    
    const user = AuthService.getCurrentUser();

    if (user && user.token) {
      const decodedJwt = parseJwt(user.token);

      if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return <></>;
};

export default AuthVerify;
import axios from "axios";
import API_BASE_URL from "./auth.config";

const register_req = async (username, email, password) => {
  return await axios.post(API_BASE_URL + '/auth/signup', {
      userName: username, 
      email: email, 
      password: password
  })
}

const login_req = async (email, password) => {
  const response = await axios.post(API_BASE_URL + '/auth/login', {email, password})

  if (response.data.token) {
      console.log(response.data)
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.reload()
  }

  return response;
}

const verifyRegistrationVerificationCode = async (verificationCode) => {
  return await axios.get(API_BASE_URL + '/auth/signup/verify', {
      params: {
          code: verificationCode
      }
  })
}

const resendRegistrationVerificationCode = async(email) => {
  return await axios.get(API_BASE_URL + "/auth/signup/resend", {
      params: {
          email: email
      }
  })
}

const getCurrentUser = () => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      console.log('No user found in localStorage');
      return null;
    }
    
    const user = JSON.parse(userStr);
    if (!user || !user.token) {
      console.log('Invalid user object or missing token:', user);
      return null;
    }
    
    console.log('Current user found:', { email: user.email, id: user.id, hasToken: !!user.token });
    return user;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    localStorage.removeItem("user"); // Clear invalid data
    return null;
  }
};

const logout_req = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("message");
  // Clear any other auth-related data
  window.location.reload();
}

const forgotPasswordVerifyEmail = async (email) => {
  return await axios.get(API_BASE_URL + "/auth/forgotPassword/verifyEmail", {
      params: {
          email: email
      }
  })
}

const forgotPasswordverifyCode = async (code) => {
  return await axios.get(API_BASE_URL + "/auth/forgotPassword/verifyCode", {
      params: {
          code: code
      }
  })
}

const resendResetPasswordVerificationCode = async(email) => {
  return await axios.get(API_BASE_URL + "/auth/forgotPassword/resendEmail", {
      params: {
          email: email
      }
  })
}

const resetPassword = async (email, password) => {
  return await axios.post(API_BASE_URL + '/auth/forgotPassword/resetPassword', {
      email: email, 
      currentPassword: "",
      newPassword: password
  })
}

const authHeader = () => {
  const user = getCurrentUser();
  if (user && user.token) {
    console.log('Auth header created with token:', user.token.substring(0, 20) + '...');
    return { Authorization: 'Bearer ' + user.token };
  } else {
    console.log('No valid user or token found for auth header');
    return {};
  }
}

const clearInvalidTokens = () => {
  try {
    const user = getCurrentUser();
    if (user && user.token) {
      // Basic validation - check if token has 3 parts
      const parts = user.token.split('.');
      if (parts.length !== 3) {
        localStorage.removeItem("user");
        return true; // Invalid token was cleared
      }
    }
  } catch (error) {
    localStorage.removeItem("user");
    return true; // Invalid token was cleared
  }
  return false;
}

const AuthService = {
  register_req,
  login_req,
  verifyRegistrationVerificationCode,
  resendRegistrationVerificationCode,
  getCurrentUser,
  logout_req,
  forgotPasswordVerifyEmail,
  forgotPasswordverifyCode,
  resendResetPasswordVerificationCode,
  resetPassword,
  authHeader,
  clearInvalidTokens
}

export default AuthService;
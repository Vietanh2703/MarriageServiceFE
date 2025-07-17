// API Configuration utility
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://marriageapi-be.onrender.com/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/Auth/register',
      LOGIN: '/Auth/login',
      VERIFY_OTP: '/Auth/verify-otp',
      RESEND_OTP: '/Auth/resend-otp',
      REFRESH_TOKEN: '/Auth/refresh-token',
      LOGOUT: '/Auth/logout'
    },
    USER: {
      PROFILE: '/User/profile',
      UPDATE_PROFILE: '/User/update-profile'
    },
    SERVICES: {
      GET_ALL: '/Services',
      GET_BY_ID: '/Services'
    }
  }
};

// Helper function to build full API URLs
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// API request helper with error handling
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const url = buildApiUrl(endpoint);

  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw new Error('Network error occurred. Please check your connection.');
  }
};

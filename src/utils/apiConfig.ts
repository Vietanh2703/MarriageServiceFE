// API Configuration utility
// Last updated: July 17, 2025 - Force redeploy v2
// Connected to: https://marriageapi-be.onrender.com/api
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://marriageapi-be.onrender.com/api',
  ENDPOINTS: {
    AUTH: {
      REGISTER: '/Auth/register',
      LOGIN: '/Auth/login',
      FIREBASE_LOGIN: '/Auth/firebase-login',
      VERIFY_OTP: '/Auth/verify-otp',
      RESEND_OTP: '/Auth/resend-otp',
      REFRESH_TOKEN: '/Auth/refresh-token',
      LOGOUT: '/Auth/logout'
    },
    USER: {
      GET_ALL: '/users',
      PROFILE: '/User/profile',
      UPDATE_PROFILE: '/User/update-profile',
      IS_PARTNER: '/userRole',
      COUNT_PARTNERS:'/count-cooperators',
    },
    SERVICES: {
      GET_ALL: '/Services',
      GET_BY_ID: '/Services'
    },
    BUSINESS_REGISTER: {
      GET_ALL: '/business-requests',
      GET_BY_ID: '/business-request',
      CREATE: '/business-request',
      CHANGE_STATUS: '/business-request',
    },
    FEEDBACK: {
        GET_ALL: '/Feedback',
        GET_BY_ID: '/Feedback',
        CREATE: '/Feedback',
        UPDATE: '/Feedback',
        DELETE: '/Feedback'
    },
    INVOICE: {
        GET_ALL: '/Invoices',
        GET_BY_ID: '/Invoice',
        CREATE: '/Invoice',
    },
    MISA_PRO: {
        GET_ALL: '/MisaProRequests',
        GET_BY_ID: '/MisaProRequest',
        CREATE: '/MisaProRequest',
        UPDATE_STATUS: '/MisaProRequest',
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

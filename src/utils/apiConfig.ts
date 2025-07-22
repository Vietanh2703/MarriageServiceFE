// API Configuration utility
// Last updated: July 23, 2025 - Added Admin endpoints
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
      PROFILE: '/User/profile',
      UPDATE_PROFILE: '/User/update-profile'
    },
    SERVICES: {
      GET_ALL: '/Services',
      GET_BY_ID: '/Services'
    },
    BUSINESS_REGISTER: {
      GET_ALL: '/business-requests',
      GET_BY_ID: '/business-request',
      CREATE: '/business-request',
    },
    // Admin-specific endpoints
    ADMIN: {
      // Dashboard statistics
      DASHBOARD_STATS: '/Admin/dashboard/stats',
      USER_GROWTH: '/Admin/dashboard/user-growth',
      USER_TYPES: '/Admin/dashboard/user-types',
      RECENT_ACTIVITY: '/Admin/dashboard/recent-activity',
      FEEDBACK_RATINGS: '/Admin/dashboard/feedback-ratings',
      
      // User management
      USERS: {
        GET_ALL: '/Admin/users',
        GET_BY_ID: '/Admin/users',
        UPDATE: '/Admin/users',
        DELETE: '/Admin/users',
        TOGGLE_STATUS: '/Admin/users/toggle-status'
      },
      
      // Partner request management
      PARTNER_REQUESTS: {
        GET_ALL: '/Admin/partner-requests',
        GET_BY_ID: '/Admin/partner-requests',
        APPROVE: '/Admin/partner-requests/approve',
        REJECT: '/Admin/partner-requests/reject'
      },
      
      // Feedback management
      FEEDBACK: {
        GET_ALL: '/Admin/feedback',
        GET_BY_ID: '/Admin/feedback',
        RESPOND: '/Admin/feedback/respond'
      }
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

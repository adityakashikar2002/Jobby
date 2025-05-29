// import axios from 'axios';

// const API_BASE_URL = 'https://apis.ccbp.in';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
// });

// // Request interceptor to add auth token to headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jobPortalToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // Handle unauthorized error
//       localStorage.removeItem('jobPortalToken');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// // Cache for API responses
// const cache = new Map();

// export const login = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/login`, {
//       username,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.error_msg || 'Login failed. Please try again.'
//     );
//   }
// };

// export const getProfile = async (token) => {
//   const cacheKey = 'profile';
//   if (cache.has(cacheKey)) {
//     return cache.get(cacheKey);
//   }

//   try {
//     const response = await axiosInstance.get('/profile');
//     const profileData = response.data.profile_details;
//     cache.set(cacheKey, profileData);
//     return profileData;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.error_msg || 'Failed to fetch profile data'
//     );
//   }
// };

// export const getJobs = async (filters = {}) => {
//   const cacheKey = JSON.stringify(filters);
//   if (cache.has(cacheKey)) {
//     return cache.get(cacheKey);
//   }

//   try {
//     const params = {};
//     if (filters.employmentType?.length > 0) {
//       params.employment_type = filters.employmentType.join(',');
//     }
//     if (filters.minimumPackage) {
//       params.minimum_package = filters.minimumPackage;
//     }
//     if (filters.search) {
//       params.search = filters.search;
//     }

//     const response = await axiosInstance.get('/jobs', { params });
//     cache.set(cacheKey, response.data);
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.error_msg || 'Failed to fetch jobs data'
//     );
//   }
// };

// export const getJobDetails = async (id) => {
//   const cacheKey = `job-${id}`;
//   if (cache.has(cacheKey)) {
//     return cache.get(cacheKey);
//   }

//   try {
//     const response = await axiosInstance.get(`/jobs/${id}`);
//     cache.set(cacheKey, response.data);
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.error_msg || 'Failed to fetch job details'
//     );
//   }
// };


import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://apis.ccbp.in';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Important for cookies to be sent
});

// Request interceptor to add auth token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      Cookies.remove('jwt_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Cache for API responses
const cache = new Map();

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error_msg || 'Login failed. Please try again.'
    );
  }
};

export const getProfile = async (token) => {
  const cacheKey = 'profile';
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axiosInstance.get('/profile');
    const profileData = response.data.profile_details;
    cache.set(cacheKey, profileData);
    return profileData;
  } catch (error) {
    throw new Error(
      error.response?.data?.error_msg || 'Failed to fetch profile data'
    );
  }
};

export const getJobs = async (filters = {}) => {
  const cacheKey = JSON.stringify(filters);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const params = {};
    if (filters.employmentType?.length > 0) {
      params.employment_type = filters.employmentType.join(',');
    }
    if (filters.minimumPackage) {
      params.minimum_package = filters.minimumPackage;
    }
    if (filters.search) {
      params.search = filters.search;
    }

    const response = await axiosInstance.get('/jobs', { params });
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error_msg || 'Failed to fetch jobs data'
    );
  }
};

export const getJobDetails = async (id) => {
  const cacheKey = `job-${id}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const response = await axiosInstance.get(`/jobs/${id}`);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error_msg || 'Failed to fetch job details'
    );
  }
};



// // api.js
// import axios from 'axios';
// import Cookies from 'js-cookie'; // Import js-cookie

// const API_BASE_URL = 'https://apis.ccbp.in';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   // withCredentials: true is typically used for HttpOnly cookies.
//   // For client-side managed cookies, it's not strictly necessary for sending the cookie
//   // if you manually add the header, but harmless if you're using it for other purposes.
//   // Since we're manually adding the Authorization header, we don't need it for token transfer.
// });

// // Request interceptor to add auth token to headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Only add Authorization header if the URL is not the login endpoint
//     if (!config.url.endsWith('/login')) {
//       // Get the token from js-cookie
//       const token = Cookies.get('jwt_token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle errors
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         // Handle unauthorized error
//         // Check if the current path is already /login to prevent infinite redirects
//         if (window.location.pathname !== '/login') {
//           Cookies.remove('jwt_token'); // Remove the token from cookies
//           window.location.href = '/login'; // Redirect to login
//         }
//       }
//       // Re-throw the error with a more specific message if available
//       throw new Error(error.response.data?.error_msg || `API Error: ${error.response.status}`);
//     } else if (error.request) {
//       // The request was made but no response was received
//       throw new Error('Network Error: No response from server.');
//     } else {
//       // Something happened in setting up the request that triggered an Error
//       throw new Error(`Request setup error: ${error.message}`);
//     }
//   }
// );

// // Cache for API responses (consider clearing cache on logout/login if needed)
// const cache = new Map();

// export const login = async (username, password) => {
//   try {
//     // Use raw axios.post for login, as it doesn't require an existing token
//     const response = await axios.post(`${API_BASE_URL}/login`, {
//       username,
//       password,
//     });
//     return response.data; // This data will contain the jwt_token
//   } catch (error) {
//     // Specific error handling for login
//     if (error.response && error.response.data && error.response.data.error_msg) {
//       throw new Error(error.response.data.error_msg);
//     } else if (error.message) {
//       throw new Error(`Login failed: ${error.message}`);
//     } else {
//       throw new Error('Login failed. Please try again.');
//     }
//   }
// };

// export const getProfile = async () => {
//   const cacheKey = 'profile';
//   if (cache.has(cacheKey)) {
//     return cache.get(cacheKey);
//   }

//   try {
//     const response = await axiosInstance.get('/profile');
//     const profileData = response.data.profile_details;
//     cache.set(cacheKey, profileData);
//     return profileData;
//   } catch (error) {
//     throw error; // Re-throw the error, interceptor handles 401
//   }
// };

// export const getJobs = async (filters = {}) => {
//   // Construct a cache key based on the actual params sent to the API
//   const params = {};
//   if (filters.employmentType?.length > 0) {
//     params.employment_type = filters.employmentType.join(',');
//   }
//   if (filters.minimumPackage) {
//     params.minimum_package = filters.minimumPackage;
//   }
//   if (filters.search) {
//     params.search = filters.search;
//   }
//   const cacheKey = JSON.stringify(params);

//   if (cache.has(cacheKey)) {
//     return cache.get(cacheKey);
//   }

//   try {
//     const response = await axiosInstance.get('/jobs', { params });
//     cache.set(cacheKey, response.data);
//     return response.data;
//   } catch (error) {
//     throw error; // Re-throw the error, interceptor handles 401
//   }
// };

// export const getJobDetails = async (id) => {
//   const cacheKey = `job-${id}`;
//   if (cache.has(cacheKey)) {
//     return cache.get(cacheKey);
//   }

//   try {
//     const response = await axiosInstance.get(`/jobs/${id}`);
//     cache.set(cacheKey, response.data);
//     return response.data;
//   } catch (error) {
//     throw error; // Re-throw the error, interceptor handles 401
//   }
// };

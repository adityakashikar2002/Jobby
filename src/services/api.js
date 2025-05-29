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
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  }
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
    const response = await axiosInstance.post('/login', {
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

export const getProfile = async () => {
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
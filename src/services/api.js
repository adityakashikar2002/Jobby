// // // import axios from 'axios';
// // // import Cookies from 'js-cookie';

// // // const API_BASE_URL = 'https://apis.ccbp.in';

// // // const axiosInstance = axios.create({
// // //   baseURL: API_BASE_URL,
// // //   headers: {
// // //     'Content-Type': 'application/json',
// // //   }
// // // });

// // // // Request interceptor to add auth token to headers
// // // axiosInstance.interceptors.request.use(
// // //   (config) => {
// // //     const token = Cookies.get('jwt_token');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => {
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // // Response interceptor to handle errors
// // // // axiosInstance.interceptors.response.use(
// // // //   (response) => response,
// // // //   (error) => {
// // // //     if (error.response && error.response.status === 401) {
// // // //       // Handle unauthorized error
// // // //       Cookies.remove('jwt_token');
// // // //       window.location.href = '/login';
// // // //     }
// // // //     return Promise.reject(error);
// // // //   }
// // // // );
// // // axiosInstance.interceptors.request.use(
// // //   (config) => {
// // //     const token = localStorage.getItem('jobby_jwt');
// // //     if (token) {
// // //       config.headers.Authorization = `Bearer ${token}`;
// // //     }
// // //     return config;
// // //   },
// // //   (error) => {
// // //     return Promise.reject(error);
// // //   }
// // // );

// // // export const login = async (username, password) => {
// // //   try {
// // //     const response = await axiosInstance.post('/login', {
// // //       username,
// // //       password,
// // //     }, {
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         'Accept': 'application/json',
// // //       },
      
// // //       withCredentials: true
// // //     });
// // //     return response.data;
// // //   } catch (error) {
// // //     throw new Error(
// // //       error.response?.data?.error_msg || 'Login failed. Please try again.'
// // //     );
// // //   }
// // // };

// // // // Rest of your API functions remain the same...
// // // export const getProfile = async () => {
// // //   try {
// // //     const response = await axiosInstance.get('/profile');
// // //     return response.data.profile_details;
// // //   } catch (error) {
// // //     throw new Error(
// // //       error.response?.data?.error_msg || 'Failed to fetch profile data'
// // //     );
// // //   }
// // // };

// // // export const getJobs = async (filters = {}) => {
// // //   try {
// // //     const params = {};
// // //     if (filters.employmentType?.length > 0) {
// // //       params.employment_type = filters.employmentType.join(',');
// // //     }
// // //     if (filters.minimumPackage) {
// // //       params.minimum_package = filters.minimumPackage;
// // //     }
// // //     if (filters.search) {
// // //       params.search = filters.search;
// // //     }

// // //     const response = await axiosInstance.get('/jobs', { params });
// // //     return response.data;
// // //   } catch (error) {
// // //     throw new Error(
// // //       error.response?.data?.error_msg || 'Failed to fetch jobs data'
// // //     );
// // //   }
// // // };

// // // export const getJobDetails = async (id) => {
// // //   try {
// // //     const response = await axiosInstance.get(`/jobs/${id}`);
// // //     return response.data;
// // //   } catch (error) {
// // //     throw new Error(
// // //       error.response?.data?.error_msg || 'Failed to fetch job details'
// // //     );
// // //   }
// // // };




// // src/services/api.js
// import axios from 'axios';

// const API_BASE_URL = 'https://apis.ccbp.in';

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('jobby_jwt');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const getProfile = async () => {
//   try {
//     const response = await axiosInstance.get('/profile');
//     return response.data.profile_details;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.error_msg || 'Failed to fetch profile data'
//     );
//   }
// };

// export const getJobs = async (filters = {}) => {
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
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.error_msg || 'Failed to fetch jobs data'
//     );
//   }
// };

// export const getJobDetails = async (id) => {
//   try {
//     const response = await axiosInstance.get(`/jobs/${id}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(
//       error.response?.data?.error_msg || 'Failed to fetch job details'
//     );
//   }
// };


// // // src/services/api.js
// // import axios from 'axios';

// // const API_BASE_URL = 'https://apis.ccbp.in';

// // const axiosInstance = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     'Content-Type': 'application/json',
// //   }
// // });

// // axiosInstance.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem('jobby_jwt');
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`;
// //     }
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // axiosInstance.interceptors.response.use(
// //   (response) => response,
// //   (error) => {
// //     if (error.response && error.response.status === 401) {
// //       // Handle unauthorized error
// //       localStorage.removeItem('jobby_jwt');
// //       window.location.href = '/login';
// //     }
// //     return Promise.reject(error);
// //   }
// // );

// // export const getProfile = async () => {
// //   try {
// //     const response = await axiosInstance.get('/profile');
// //     return response.data;
// //   } catch (error) {
// //     throw new Error(
// //       error.response?.data?.error_msg || 'Failed to fetch profile data'
// //     );
// //   }
// // };

// // export const getJobs = async (filters = {}) => {
// //   try {
// //     const params = {};
// //     if (filters.employmentType?.length > 0) {
// //       params.employment_type = filters.employmentType.join(',');
// //     }
// //     if (filters.minimumPackage) {
// //       params.minimum_package = filters.minimumPackage;
// //     }
// //     if (filters.search) {
// //       params.search = filters.search;
// //     }

// //     const response = await axiosInstance.get('/jobs', { params });
// //     return response.data;
// //   } catch (error) {
// //     throw new Error(
// //       error.response?.data?.error_msg || 'Failed to fetch jobs data'
// //     );
// //   }
// // };

// // export const getJobDetails = async (id) => {
// //   try {
// //     const response = await axiosInstance.get(`/jobs/${id}`);
// //     return response.data;
// //   } catch (error) {
// //     throw new Error(
// //       error.response?.data?.error_msg || 'Failed to fetch job details'
// //     );
// //   }
// // };




// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://apis.ccbp.in';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jobby_jwt');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('jobby_jwt');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getProfile = async () => {
  try {
    const response = await axiosInstance.get('/profile');
    return response.data.profile_details;
  } catch (error) {
    throw new Error(
      error.response?.data?.error_msg || 'Failed to fetch profile data'
    );
  }
};

export const getJobs = async (filters = {}) => {
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
    if (filters.location) {
      params.location = filters.location;
    }
    if (filters.skills) {
      params.skills = filters.skills;
    }

    const response = await axiosInstance.get('/jobs', { params });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error_msg || 'Failed to fetch jobs data'
    );
  }
};

export const getJobDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/jobs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error_msg || 'Failed to fetch job details'
    );
  }
};
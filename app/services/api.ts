import axios, { AxiosError } from 'axios';

// API Configuration
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from Expo SecureStore or Clerk
    const token = config.headers.Authorization?.split(' ')[1];
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
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      console.error('API Error:', error.response.data);
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      console.error('Network Error:', error.message);
      return Promise.reject({ error: 'Network error - please check connection' });
    }
    return Promise.reject(error);
  }
);

// API Endpoints
export const api = {
  // Health Check
  health: () => apiClient.get('/health'),
  
  // Auth
  auth: {
    getUser: (clerkId: string, email: string, firstName?: string, lastName?: string, avatarUrl?: string) => 
      apiClient.post('/api/auth/user', { 
        clerk_id: clerkId,
        email,
        first_name: firstName,
        last_name: lastName,
        avatar_url: avatarUrl,
      }),
    getUserByClerkId: (clerkId: string) => 
      apiClient.get(`/api/auth/user?clerk_id=${clerkId}`),
  },
  
  // Pets
  pets: {
    getAll: () => apiClient.get('/api/pets'),
    getById: (id: string) => apiClient.get(`/api/pets/${id}`),
    create: (data: any) => apiClient.post('/api/pets', data),
    update: (id: string, data: any) => apiClient.put(`/api/pets/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/pets/${id}`),
  },
  
  // Health Records
  health: {
    getForPet: (petId: string) => apiClient.get(`/api/health/pets/${petId}`),
    create: (data: any) => apiClient.post('/api/health', data),
    delete: (id: string) => apiClient.delete(`/api/health/${id}`),
  },
  
  // Reminders
  reminders: {
    getAll: () => apiClient.get('/api/reminders'),
    create: (data: any) => apiClient.post('/api/reminders', data),
    complete: (id: string) => apiClient.put(`/api/reminders/${id}/complete`),
    delete: (id: string) => apiClient.delete(`/api/reminders/${id}`),
  },
  
  // Vets
  vets: {
    getAll: () => apiClient.get('/api/vets'),
    getById: (id: string) => apiClient.get(`/api/vets/${id}`),
    create: (data: any) => apiClient.delete('/api/vets'),
    update: (id: string, data: any) => apiClient.put(`/api/vets/${id}`, data),
    delete: (id: string) => apiClient.delete(`/api/vets/${id}`),
  },
};

export default api;

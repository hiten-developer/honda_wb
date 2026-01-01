// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds increase kiya
});

// Request interceptor
api.interceptors.request.use(
  config => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  response => {
    console.log(`API Response from ${response.config.url}:`, response.data);
    return response;
  },
  error => {
    console.error('API Response error:', {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Get all bikes
export const fetchBikes = async () => {
  try {
    console.log('Fetching bikes from:', `${API_BASE_URL}/bikes`);
    const response = await api.get('/bikes');
    console.log('Raw bikes response:', response);
    
    // Return based on response structure
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else if (response.data && response.data.bikes && Array.isArray(response.data.bikes)) {
      return response.data.bikes;
    } else {
      console.warn('Unexpected bikes response structure:', response.data);
      return response.data || [];
    }
  } catch (error) {
    console.error('Error in fetchBikes:', error);
    throw error;
  }
};

// Get bike by ID
export const fetchBikeById = async (id) => {
  try {
    const response = await api.get(`/bikes/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error fetching bike ${id}:`, error);
    throw error;
  }
};

// Get bike images
export const fetchBikeImages = async () => {
  try {
    const response = await api.get('/bike-images');
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching bike images:', error);
    return [];
  }
};

// Get all variants
export const fetchVariants = async () => {
  try {
    const response = await api.get('/variants');
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching variants:', error);
    return [];
  }
};

// Get variant by ID
export const fetchVariantById = async (id) => {
  try {
    const response = await api.get(`/variants/${id}`);
    return response.data.data || response.data;
  } catch (error) {
    console.error(`Error fetching variant ${id}:`, error);
    throw error;
  }
};

// Get variant images
export const fetchVariantImages = async () => {
  try {
    const response = await api.get('/variant-images');
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching variant images:', error);
    return [];
  }
};

// Get gallery
export const fetchGallery = async () => {
  try {
    const response = await api.get('/gallery');
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }
};

// Get brochures
export const fetchBrochures = async () => {
  try {
    const response = await api.get('/brochures');
    return response.data.data || response.data;
  } catch (error) {
    console.error('Error fetching brochures:', error);
    return [];
  }
};

export default api;
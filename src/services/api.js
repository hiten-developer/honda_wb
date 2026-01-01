import axios from "axios";

export const API_BASE_URL = "https://wft8qmjb-4000.inc1.devtunnels.ms";

export const getAllBikes = async () => {
  const res = await axios.get(`${API_BASE_URL}/bikes`);
  return res.data.data;
};

export const getBikeById = async (id) => {
  const res = await axios.get(`${API_BASE_URL}/bikes/${id}`);
  return res.data;
};

export const getBikeImages = async () => {
  const res = await axios.get(`${API_BASE_URL}/bike-images`);
  return res.data;
};

export const getBrochures = async () => {
  const res = await axios.get(`${API_BASE_URL}/brochures`);
  return res.data.data;
};

export const getGalleryImages = async () => {
  const res = await axios.get(`${API_BASE_URL}/gallery`);
  return res.data;
};


export const sendContactMessage = async (payload) => {
  const res = await axios.post(`${API_BASE_URL}/contact`, payload);
  return res.data;
};
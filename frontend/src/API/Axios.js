import axios from 'axios';

// Base Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080', 
  timeout: 5000
});

// Fetch shapes in a specific room
export const fetchShapes = async (roomId) => {
  try {
    const response = await api.get(`/app/shapes/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shapes:', error);
    throw error; // Re-throw error for higher-level handling
  }
};

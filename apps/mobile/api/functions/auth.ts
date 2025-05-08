import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5001/codecamp2025/us-central1'

export const signup = async (formData: Record<string, any>) => {
    if (!formData.name || !formData.surname || !formData.email || !formData.password) {
      throw new Error("Missing required fields");
    }
  
    try {
      const response = await axios.post("http://10.0.2.2:5001/codecamp2025/us-central1/signup", formData);
      return response.data;
    } catch (error) {
      console.error("Error in signup API:", error);
      throw error; // Rethrow the error to be caught in useAuth
    }
  };
  
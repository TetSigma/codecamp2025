import axios from 'axios';
import { signup } from "../functions";
import { useUserStore } from "../../stores/useUserStore"; // import zustand store

const useAuth = () => {
  const { user, setUser, clearUser } = useUserStore();

  const signupUser = async (formData: Record<string, any>) => {
    try {
      if (!formData.name || !formData.surname || !formData.email || !formData.password) {
        throw new Error("Missing required fields");
      }

      const result = await signup(formData);

      setUser(result);
      alert("Signup successful! 🎉");
    } catch (err: any) {
      console.error("Signup error:", err);
      alert(err?.message || "Signup failed. Please try again.");
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const result = await axios.post("http://10.0.2.2:5001/codecamp2025/us-central1/login", { email, password });

      setUser(result.data);
      alert("Login successful! 🎉");
    } catch (err: any) {
      console.error("Login error:", err);
      alert(err?.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const logoutUser = () => {
    clearUser();
  };

  return {
    user,
    signupUser,
    loginUser,
    logoutUser,
  };
};

export default useAuth;

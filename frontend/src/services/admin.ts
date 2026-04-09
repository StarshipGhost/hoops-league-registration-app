import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://hoops-league-registration-app.onrender.com";

const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${BASE_URL}/admin/login`,
    { username, password },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${BASE_URL}/admin/logout`, { withCredientials: true });
  return response.data;
};

const checkAdmin = async () => {
  const response = await axios.get(`${BASE_URL}/admin/me`);
  return response.data.isAdmin;
};

export default { login, logout, checkAdmin };

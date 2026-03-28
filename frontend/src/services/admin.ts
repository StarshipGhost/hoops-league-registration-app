import axios from "axios";
const ADMIN_URL = "http://localhost:3000/admin";

const login = async (username: string, password: string) => {
  const response = await axios.post(
    `${ADMIN_URL}/login`,
    { username, password },
    {
      withCredentials: true,
    },
  );
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${ADMIN_URL}/logout`, { withCredientials: true });
  return response.data;
};

const checkAdmin = async () => {
  const response = await axios.get(`${ADMIN_URL}/me`);
  return response.data.isAdmin;
};

export default { login, logout, checkAdmin };

import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000"
    : "https://hoops-league-registration-app.onrender.com";

const getGuestId = async (): Promise<string> => {
  const response = await axios.get(`${BASE_URL}/guest`, {
    withCredentials: true,
  });
  return response.data.guestId;
};

export default {
  getGuestId,
};
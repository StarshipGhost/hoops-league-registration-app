import axios from "axios";

const BASE_URL = "http://localhost:3000";

const getGuestId = async (): Promise<string> => {
  const response = await axios.get(`${BASE_URL}/guest`, {
    withCredentials: true,
  });
  return response.data.guestId;
};

export default {
  getGuestId,
};